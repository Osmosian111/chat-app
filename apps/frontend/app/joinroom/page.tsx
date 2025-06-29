import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { BACKEND_URL } from "../config";

export default function JoinRoom() {

  const [form,setForm] = useState({name:""})

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setForm({...form,[e.target.name]:e.target.value});
  }

  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    axios.post(`${BACKEND_URL}/room/${form.name}`);
  }

  return (
    <div>
      <h1>Join Room</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomName">Room Name</label>
        <br />
        <input
          type="text"
          id="roomName"
          name="roomName"
          placeholder="roomName"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Join</button>
      </form>
    </div>
  );
}
