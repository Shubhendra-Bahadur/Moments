import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
 export const errorToast=(message)=>{
        toast.error(message,{
            position: toast.POSITION.TOP_CENTER,
        });
 }

 export const successToast=(message)=>{
        toast.success(message,{
            position: toast.POSITION.TOP_CENTER,
        });
 }