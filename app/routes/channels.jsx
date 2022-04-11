import { useLoaderData, Link, Outlet } from 'remix';
import supabase from '~/utils/supabase';

export const loader = async () => {
  const { data: channels, error } = await supabase
    .from('channels')
    .select('id, title');

  if (error) {
    console.log(error.message);
  }

  return {
    channels,
  };
};

export default () => {
  const { channels } = useLoaderData();

  console.log(supabase.auth.user());

  return (
    <div className="h-screen flex">
      <div className="bg-gray-800 text-white w-40 p-8">
        {channels.map((channel) => (
          <p key={channel.id}>
            <Link to={`/channels/${channel.id}`}>
              <span className="text-gray-400 mr-1">#</span>
              {channel.title}
            </Link>
          </p>
        ))}
      </div>
      <div className="flex-1 p-8 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
};
