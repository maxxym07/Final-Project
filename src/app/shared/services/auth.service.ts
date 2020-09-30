import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStatus = new Subject<string>();
  constructor(private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router) { }
  
    signIn(email: string, password: string): void {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then(user => {
          this.afFirestore.collection('users').ref.where('idAuth', '==', user.user.uid).onSnapshot(
            snap => {
              snap.forEach(userRef =>{
                localStorage.setItem('user', JSON.stringify(userRef.data()))
                if (userRef.data().role === 'admin' && userRef.data().access) {
                  this.router.navigateByUrl('admin');
                  this.userStatus.next('')
                  console.log('good')
    
                }
                else {
                  this.router.navigateByUrl('profile');
                  this.userStatus.next('')
                }
              })
            }
          )
        })
        .catch(() => alert('Користувач не знайдений!'))
    }
  
    signOut(): void {
      this.afAuth.signOut()
        .then(() => {
          // localStorage.clear();
          localStorage.removeItem('user')
          this.router.navigateByUrl('/home');
          this.userStatus.next('')
    
        })
        .catch(err => console.log(err))
    }
  
    signUp(email: string, password: string, firstName: string, secondName: string, phone: string): void{
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userResponse => {
          const user = {
            idAuth: userResponse.user.uid,
            email: userResponse.user.email,
            role: 'user',
            firstName: firstName,
            secondName: secondName,
           phone: phone,
            orders: [],
          };
          this.afFirestore.collection('users').add(user)
            .then(data => {
              data.get()
              .then(user=>{
                localStorage.setItem('user', JSON.stringify(user.data()))
                this.router.navigateByUrl('profile');
                this.userStatus.next();
          this.userStatus.next('')
              })
          })
      })
       .catch(err => alert('Даний емайл вже використовується!'))
  }
}
