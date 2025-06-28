export default function Signup() {
  return (
    <div>
      <h1>Signup</h1>
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
        <label htmlFor="name">Name</label>
        <br />
        <input type="name" id="name" name="name" placeholder="Name" />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
