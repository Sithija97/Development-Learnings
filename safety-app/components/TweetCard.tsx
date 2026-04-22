import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { CommunityPost, CommunityPostComment } from "../models";
import { RootState, useAppSelector } from "../store/store";
import moment from "moment";

interface TweetCardProps {
  post: CommunityPost;
  onLikeToggle: () => void;
  onReply: () => void;
  onDelete: () => void;
  showReplyInput: boolean;
  replyText: string;
  setReplyText: (text: string) => void;
  handlePostComment: () => void;
}

const TweetCard: React.FC<TweetCardProps> = ({
  post,
  onLikeToggle,
  onReply,
  onDelete,
  showReplyInput,
  replyText,
  setReplyText,
  handlePostComment,
}) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const postTimestamp = moment(post.createdAt);
  const relativeTime = postTimestamp.fromNow();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
      <Image
        source={{ uri: "https://i.ibb.co/4pDNDk1/avatar.png" }}
        style={styles.profileImage}
      />
      <View style={styles.tweetContent}>
        <View style={styles.header}>
          <Text style={styles.username}>
            {user ? user.fullName : "test user"}
          </Text>
          <Text style={styles.timeAgo}>
            {
              <Text style={styles.timeAgo}>
                {user ? relativeTime : "2 mins ago"}
              </Text>
            }
          </Text>
        </View>
        <Text style={styles.tweetText}>{post.title}</Text>
        <Text style={styles.tweetText}>{post.description}</Text>

        <View style={styles.replyContainer}>
          <TouchableOpacity onPress={onReply}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={onLikeToggle}>
            <Ionicons
              name={post.likedByCurrentUser === 1 ? "heart" : "heart-outline"}
              size={24}
              color={post.likedByCurrentUser === 1 ? "red" : COLORS.grey}
              style={styles.heartIcon}
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{post.likeCount}</Text>
        </View>
        {showReplyInput && (
          <View style={styles.replyInputContainer}>
            <TextInput
              style={styles.replyInput}
              placeholder="Add a reply..."
              value={replyText}
              onChangeText={setReplyText}
            />
            <TouchableOpacity
              style={styles.replyButton}
              onPress={handlePostComment}
            >
              <Text style={styles.replyButtonText}>Comment</Text>
            </TouchableOpacity>
          </View>
        )}
        {post.CommunityPostComments?.length > 0 && (
          <View style={styles.repliesContainer}>
            {post.CommunityPostComments.map(
              (comment: CommunityPostComment, index: number) => (
                <View key={index} style={styles.reply}>
                  <Text>{comment.comment}</Text>
                  <Text>{`Commented By: ${comment.User.fullName}`}</Text>
                </View>
              )
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  tweetContent: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  handle: {
    color: "#657786",
    marginLeft: 5,
  },
  timeAgo: {
    color: "#657786",
    marginLeft: 5,
  },
  tweetText: {
    marginTop: 5,
    fontSize: 16,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  replyText: { color: "gray", fontSize: 13 },
  heartIcon: {
    position: "absolute",
    bottom: 5,
    right: 10,
  },
  likeCount: {
    position: "absolute",
    bottom: 5,
    right: -5,
    color: COLORS.grey,
    fontSize: 12,
  },
  replyInputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  replyInput: {
    flex: 1,
  },
  replyButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    alignSelf: "flex-end",
  },
  replyButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  repliesContainer: {
    marginTop: 10,
  },
  reply: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
  },
});

export default TweetCard;
