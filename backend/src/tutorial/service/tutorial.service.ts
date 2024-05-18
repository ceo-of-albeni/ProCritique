import { Injectable } from '@nestjs/common';
import { ref, set, get, child, orderByChild, equalTo, query} from 'firebase/database';
import { firebaseDataBase } from 'src/firebase.config';

@Injectable()
export class TutorialService {
  private dbRef = ref(firebaseDataBase);

  async createUserData(userId: string, data: any): Promise<void> {
    await set(ref(firebaseDataBase, 'users/' + userId), data);
  }

  async createCourseData(courseId: string, data: any): Promise<void> {
    await set(ref(firebaseDataBase, 'courses/' + courseId), data);
  }

  async addCommentToCourse(courseId: string, commentId: string, data: any): Promise<void> {
    await set(ref(firebaseDataBase, `courses/${courseId}/comments/${commentId}`), data);
  }

  async getUserData(userId: string): Promise<any> {
    const snapshot = await get(child(this.dbRef, `users/${userId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  async getCourseData(courseId: string): Promise<any> {
    const snapshot = await get(child(this.dbRef, `courses/${courseId}`));
    return snapshot.exists() ? snapshot.val() : null;
  }

  async getCoursesByCategory(category: string): Promise<any[]> {
    const coursesRef = query(ref(firebaseDataBase, 'courses'), orderByChild('category'), equalTo(category));
    const snapshot = await get(coursesRef);
    const courses = [];
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        courses.push(childSnapshot.val());
      });
    }
    return courses;
  }

  async getAllCourses(): Promise<any[]> {
    const snapshot = await get(ref(firebaseDataBase, 'courses'));
    const courses = [];
    if (snapshot.exists()) {
      snapshot.forEach(childSnapshot => {
        courses.push(childSnapshot.val());
      });
    }
    return courses;
}
}