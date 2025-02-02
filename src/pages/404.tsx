import { Link } from "react-router-dom";
import Center from "../components/center";

export default function Error404() {
  return (
    <Center>
      <p>
        Sorry! We could not find the page you were looking for. Try going{" "}
        <Link to="/">Back Home</Link>.
      </p>
    </Center>
  );
}
