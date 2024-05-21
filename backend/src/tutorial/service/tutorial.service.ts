import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { firestore, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, storage, database } from 'src/firebase.config';
import { ref as dbRef, get, set, update, remove, query, orderByChild, equalTo } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, setDoc, getDoc, query as firestoreQuery, where, getDocs } from 'firebase/firestore';

@Injectable()
export class TutorialService {
  // Firestore methods
  async createUserData(createUserDto: CreateUserDto): Promise<{ id: string }> {
    const { email, password, username } = createUserDto;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userId = user.uid;

      await setDoc(doc(firestore, 'users', userId), {
        id: userId,
        email,
        username,
      });

      await set(dbRef(database, 'users/' + userId), {
        id: userId,
        email,
        username,
      });

      return { id: userId };
    } catch (error) {
      throw new UnauthorizedException('Error creating user');
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ idToken: string; email: string; username: string }> {
    const { email, password } = loginUserDto;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const idToken = await user.getIdToken();
      const userDoc = await getDoc(doc(firestore, 'users', user.uid));
      const userData = userDoc.data();

      if (!userData) {
        throw new NotFoundException('User not found in Firestore');
      }

      return { idToken, email: user.email, username: userData.username };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getAllUsers(): Promise<any[]> {
    const usersCollection = collection(firestore, 'users');
    const userDocs = await getDocs(usersCollection);
    return userDocs.docs.map(doc => doc.data());
  }

  async getUserData(userId: string): Promise<any> {
    const userDoc = await getDoc(doc(firestore, 'users', userId));
    const userData = userDoc.data();
    if (!userData) {
      throw new NotFoundException('User not found');
    }
    return userData;
  }

  // Realtime Database methods for courses
  async createCourseData(courseId: string, createCourseDto: CreateCourseDto): Promise<void> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    await set(courseRef, createCourseDto);
  }

  async addCommentToCourse(courseId: string, commentId: string, createCommentDto: CreateCommentDto): Promise<void> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    const snapshot = await get(courseRef);
    const course = snapshot.val();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (!course.comments) {
      course.comments = {};
    }
    course.comments[commentId] = createCommentDto;
    await update(courseRef, { comments: course.comments });
    await this.updateCourseRating(courseId);
  }

  async deleteCommentFromCourse(courseId: string, commentId: string): Promise<void> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    const snapshot = await get(courseRef);
    const course = snapshot.val();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.comments && course.comments[commentId]) {
      delete course.comments[commentId];
      await update(courseRef, { comments: course.comments });
      await this.updateCourseRating(courseId);
    } else {
      throw new NotFoundException('Comment not found');
    }
  }

  async getCourseData(courseId: string): Promise<any> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    const snapshot = await get(courseRef);
    const courseData = snapshot.val();
    if (!courseData) {
      throw new NotFoundException('Course not found');
    }
    return courseData;
  }

  async getCoursesByCategory(category: string): Promise<any[]> {
    const coursesRef = query(dbRef(database, 'courses'), orderByChild('category'), equalTo(category));
    const snapshot = await get(coursesRef);
    const courses = snapshot.val();
    return Object.values(courses || {});
  }

  async getAllCourses(): Promise<any[]> {
    const coursesRef = dbRef(database, 'courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.val();
    return Object.values(courses || {});
  }

  async getTeachersAndMentors(courseId: string): Promise<any> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    const snapshot = await get(courseRef);
    const course = snapshot.val();
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return {
      teachers: course.teachers,
      mentors: course.mentors,
    };
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileRef = storageRef(storage, `icons/${uuidv4()}-${file.originalname}`);
    await uploadBytes(fileRef, file.buffer);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  }

  async getFileUrl(fileName: string): Promise<string> {
    try {
      const fileRef = storageRef(storage, `icons/${fileName}`);
      await getMetadata(fileRef); // Проверка существования файла
      const downloadURL = await getDownloadURL(fileRef);
      return downloadURL;
    } catch (error) {
      throw new NotFoundException(`File ${fileName} not found`);
    }
  }

  async getCoursesSortedByRating(order: string): Promise<any[]> {
    const coursesRef = dbRef(database, 'courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.val();
    const coursesArray = Object.values(courses || {});
    coursesArray.sort((a: any, b: any) => {
      const ratingA = this.calculateAverageRating(a.comments);
      const ratingB = this.calculateAverageRating(b.comments);
      return order === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
    return coursesArray;
  }

  private async updateCourseRating(courseId: string): Promise<void> {
    const courseRef = dbRef(database, 'courses/' + courseId);
    const snapshot = await get(courseRef);
    const course = snapshot.val();
    if (course && course.comments) {
      const ratings = Object.values(course.comments).map((comment: any) => comment.rating);
      const averageRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : '0';
      await update(courseRef, { common_rate: averageRating });
    }
  }

  private calculateAverageRating(comments: any): number {
    const ratings = Object.values(comments || {}).map((comment: any) => comment.rating);
    const sum = ratings.reduce((a, b) => a + b, 0);
    return ratings.length ? sum / ratings.length : 0;
  }
}
