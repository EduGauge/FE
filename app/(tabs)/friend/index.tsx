import { router } from "expo-router";
import EmptyFriendView from "../../../components/friend/EmptyFriendView";
import FriendList, {
  Friend,
} from "../../../components/friend/FriendList";

const friends: Friend[] = [
  { id: "1", name: "친구 1", progress: 0 },
  { id: "2", name: "친구 2", progress: 75 },
  { id: "3", name: "친구 3", progress: 100 },
];

export default function FriendScreen() {
  const handleAddFriend = () =>
    router.push("/friend/add");

  const handleManageFriend = () =>
    router.push("/friend/manage");

  if (friends.length === 0) {
    return (
      <EmptyFriendView
        onAddFriend={handleAddFriend}
      />
    );
  }

  return (
    <FriendList
      friends={friends}
      onManageFriend={handleManageFriend}
    />
  );
}
