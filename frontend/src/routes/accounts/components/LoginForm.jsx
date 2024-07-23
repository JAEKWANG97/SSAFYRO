export default function LoginForm() {
  return (
    <>
      <form action="">
        <div>
          ID
          <input
            className="border border-gray-900"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          PW
          <input
            className="border border-gray-900"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <input
          className=" border border-gray-900"
          type="submit"
          value="로그인"
        />
      </form>
    </>
  );
}
