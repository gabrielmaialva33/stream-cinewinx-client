// app/page.js (or app/RootPage.js)
import {redirect} from 'next/navigation';

export default function RootPage() {
    const isLogged = true;

    if (!isLogged) {
        redirect('/login');
    } else {
        redirect('/home');
    }
}
