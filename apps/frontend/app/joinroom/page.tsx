export default function JoinRoom() {
  return (
    <div>
      <h1>Join Room</h1>
      <form action="">
        <label htmlFor="roomName">Room Name</label>
        <br />
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="roomName"
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
