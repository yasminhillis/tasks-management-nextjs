import { useState } from "react"

export function useToast(){
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    function showToast(message: string, success: boolean, duration = 3000){
        setMessage(message)
        setSuccess(success)
        setTimeout(() => {
            setMessage('');
            setSuccess(false)
        }, duration)
    }
    return { message, success, showToast }
}