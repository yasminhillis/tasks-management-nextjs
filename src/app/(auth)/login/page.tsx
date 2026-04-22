import LoginForm from "./LoginForm"
export default function Login(){
    return (
        <div className="flex flex-col justify-center flex-1 px-6  md:shadow-[0px_24px_48px_0px_rgba(4,27,60,0.06)] font-sans md:max-w-[480px] md:mx-auto md:rounded-lg md:bg-white">
            <h2 className="font-semibold text-center text-2xl text-slate-900 mb-2 mt-6">Welcome Back</h2>
            <p className="text-sm text-slate-600 text-center mb-6">Please enter your details to access your workspace</p>
            <LoginForm />
        </div>
    )
}