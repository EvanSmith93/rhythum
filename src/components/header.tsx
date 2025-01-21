import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <h1>
        <img src={logo} width="46px" alt="Rhythum Logo" />
        Rhythum
      </h1>
      <hr />
    </header>
  );
}
