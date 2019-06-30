import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private router: Router,
  ) {

    // console.log( 'Check auth state:\n' + this.afAuth.authState );
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {

          // Logged in
        if (user) {
          console.log('Check uid: \n' + user.uid);
          
          this.updateUserData(user);
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )
  }

  ////////////////////////////////////////////////////////

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    provider.setCustomParameters({
      'hd': 'slcpl.org'
    });
    this.afAuth.auth.signInWithRedirect(provider);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    console.log('Check uid update: \n' + user.uid);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

}