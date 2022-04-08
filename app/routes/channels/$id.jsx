import channels from "~/data/channels.json";
import { useLoaderData } from "remix";

export const loader = ({ params: { id } }) => {
  const channel = channels.find((c) => c.id === id);
  return {
    channel,
  };
};

export default () => {
  const { channel } = useLoaderData();
  return <pre>{JSON.stringify(channel, null, 2)}</pre>;
};
