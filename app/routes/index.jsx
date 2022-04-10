import { Link } from 'remix';

export default function Index() {
  return (
    <div>
      <h1>Hello, Level Up Tutorials!</h1>
      <Link to="/channels">Channels</Link>
    </div>
  );
}
