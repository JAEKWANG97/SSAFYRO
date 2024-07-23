import LoginForm from "./components/LoginForm";

export default function Login() {
  return (
    <>
      <div className="h-dvh flex justify-center items-center">
        <div className="h-[400px] w-[400px] rounded-lg shadow-xl flex flex-col justify-start items-center">
          <div className="text-4xl font-extrabold text-[#90CCF0] my-24">
            SSAFYRO
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
