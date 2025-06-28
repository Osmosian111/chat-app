export default function Signin() {
  return (
    <div>
      <h1>Signin</h1>
      <form action="">
        <label htmlFor="email">Email</label>
        <br />
        <input type="email" id="email" name="email" placeholder="Email" />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
