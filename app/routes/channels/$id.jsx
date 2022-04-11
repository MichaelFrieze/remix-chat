import { useLoaderData, Form, useFetcher } from 'remix';
import supabase from '~/utils/supabase';
import { useEffect, useState } from 'react';
import withAuthRequired from '~/utils/withAuthRequired';

export const loader = async ({ request, params: { id } }) => {
  const { supabase, redirect } = await withAuthRequired({ request });
  if (redirect) return redirect;

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
  const { supabase, redirect } = await withAuthRequired({ request });
  if (redirect) return redirect;

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
  const [messages, setMessages] = useState([...channel.messages]);
  const fetcher = useFetcher();

  useEffect(() => {
    supabase
      .from(`messages:channel_id=eq.${channel.id}`)
      .on('*', (payload) => {
        // something changed
        // call the loader
        fetcher.load(`/channels/${channel.id}`);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setMessages([...fetcher.data.channel.messages]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    setMessages([...channel.messages]);
  }, [channel]);

  return (
    <>
      <h1 className="text-2xl uppercase mb-2">{channel.title}</h1>
      <p className="text-gray-600 border-b border-gray-300 pb-6">
        {channel.description}
      </p>
      <div className="flex-1 flex flex-col p-2 overflow-auto">
        <div className="mt-auto">
          {messages.map((message) => (
            <p key={message.id} className="p-2">
              {message.content}
            </p>
          ))}
        </div>
      </div>
      <Form method="post" className="flex">
        <input name="content" className="border border-gray-200 px-2 flex-1" />
        <input type="hidden" name="channelId" value={channel.id} />
        <button className="px-4 py-2 ml-4 bg-blue-200">Send!</button>
      </Form>
    </>
  );
};
