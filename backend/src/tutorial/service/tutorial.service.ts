import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { CreateCourseDto } from 'src/dto/create-course.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { database, storage } from 'src/firebase.config';
import { ref as dbRef, get, set, update, query, orderByChild, equalTo } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL, getMetadata } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TutorialService {

  async getAllUsers(): Promise<any[]> {
    const usersRef = dbRef(database, 'users');
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    return Object.values(users || {});
  }
  
  async createUserData(createUserDto: CreateUserDto): Promise<{ id: string }> {
    const userId = uuidv4(); // Генерация уникального идентификатора для пользователя
    const userRef = dbRef(database, 'users/' + userId);
    await set(userRef, { id: userId, ...createUserDto });
    return { id: userId };
  }

  async getUserData(userId: string): Promise<any> {
    const userRef = dbRef(database, 'users/' + userId);
    const snapshot = await get(userRef);
    const userData = snapshot.val();
    if (!userData) {
      throw new NotFoundException('User not found');
    }
    return userData;
  }

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

  private calculateAverageRating(comments: any): number {
    const ratings = Object.values(comments || {}).map((comment: any) => comment.rating);
    const sum = ratings.reduce((a, b) => a + b, 0);
    return ratings.length ? sum / ratings.length : 0;
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
}
