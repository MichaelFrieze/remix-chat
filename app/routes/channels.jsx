import { useLoaderData, Link, Outlet } from 'remix';
import channels from '~/data/channels.json';

export const loader = async () => {
  return {
    channels,
  };
};

export default () => {
  const { channels } = useLoaderData();
  return (
    <div>
      {channels.map((channel) => (
        <p key={channel.id}>
          <Link to={`/channels/${channel.id}`}>{channel.title}</Link>
        </p>
      ))}
      <Outlet />
    </div>
  );
};
