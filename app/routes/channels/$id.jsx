import { useLoaderData, Form } from 'remix';
import supabase from '~/utils/supabase';

export const loader = async ({ params: { id } }) => {
  const { data: channel, error } = await supabase
    .from('channels')
    .select('id, title, description, messages(id, content)')
    .match({ id })
    .single();

  if (error) {
    console.log(error.message);
  }

  return {
    channel,
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const content = formData.get('content');
  const channelId = formData.get('channelId');
  const { error } = await supabase
    .from('messages')
    .insert({ content, channel_id: channelId });
  if (error) {
    console.log(error.message);
  }

  return null;
};

export default () => {
  const { channel } = useLoaderData();

  return (
    <div>
      <pre>{JSON.stringify(channel, null, 2)}</pre>
      <Form method="post">
        <input name="content" />
        <input type="hidden" name="channelId" value={channel.id} />
        <button>Send!</button>
      </Form>
    </div>
  );
};
