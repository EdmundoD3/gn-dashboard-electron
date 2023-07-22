import { useState } from "react";

export default function AddClient() {
  const [colonia, setColonia] = useState("");
  const [data, setData] = useState(false);
  const handleChange = (event) => {
    setColonia(event.target.value);
  };

  const handleSubmit = (event) => {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          colonia:
          <select value={colonia} onChange={handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
