import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/fireBase/fireBase.js'

export function useAuth() {
    const user = ref(null)
    const isAuthenticated = ref(false)
    const userLogin = ref('') // Добавляем хранение логина

    onMounted(() => {
        onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Загружаем дополнительные данные (логин) из Firestore
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
                if (userDoc.exists()) {
                    userLogin.value = userDoc.data().login
                }
            } else {
                userLogin.value = ''
            }
            user.value = firebaseUser
            isAuthenticated.value = !!firebaseUser
        })
    })

    return { user, isAuthenticated, userLogin }
}