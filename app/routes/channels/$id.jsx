import { useLoaderData } from 'remix';
import supabase from '~/utils/supabase';

export const loader = async ({ params: { id } }) => {
  const { data: channel, error } = await supabase
    .from('channels')
    .select('title, description, messages(id, content)')
    .match({ id })
    .single();

  if (error) {
    console.log(error.message);
  }

  return {
    channel,
  };
};

export default () => {
  const { channel } = useLoaderData();
  return <pre>{JSON.stringify(channel, null, 2)}</pre>;
};
