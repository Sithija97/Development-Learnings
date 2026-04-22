import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { ImageSetTwo } from "../components";
import TweetCard from "../components/TweetCard";
import { CommunityPost } from "../models";
import { RootState, useAppDispatch, useAppSelector } from "../store/store";
import {
  commentCommunityPosts,
  createCommunityPosts,
  deleteCommunityPost,
  likeCommunityPosts,
} from "../store/community/communitySlice";

export const Community = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const communityPosts = useAppSelector(
    (state: RootState) => state.community.posts
  );
  const user = useAppSelector((state: RootState) => state.auth.user);

  const [titleText, setTitleText] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  // Assuming tweets is now an array of CommunityPost objects
  const [tweets, setTweets] = useState<CommunityPost[]>(communityPosts || []);

  const badWords = ["badword1", "badword2", "badword3"]; // Replace with your list of bad words

  const handleAddTweet = () => {
    if (titleText && descriptionText) {
      const hasBadWordsInTitle = badWords.some((badWord) =>
        titleText.includes(badWord)
      );
      const hasBadWordsInDescription = badWords.some((badWord) =>
        descriptionText.includes(badWord)
      );

      if (hasBadWordsInTitle || hasBadWordsInDescription) {
        alert(
          "Your title or description contains bad words. Please remove them."
        );
        return; // Terminate the process
      }

      const newPost: CommunityPost = {
        id: tweets?.length + 1, // Generate a unique ID here
        title: titleText,
        description: descriptionText,
        userId: 1, // Replace with the actual user ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likeCount: 0,
        likedByCurrentUser: 0,
        CommunityPostComments: [],
      };

      dispatch(
        createCommunityPosts({ title: titleText, description: descriptionText })
      );

      setTweets([newPost, ...tweets]);
      setTitleText("");
      setDescriptionText("");
    }
  };

  const handleLikeToggle = (postId: number) => {
    const updatedTweets = tweets.map((tweet) => {
      if (tweet.id === postId) {
        return {
          ...tweet,
          likedByCurrentUser: tweet.likedByCurrentUser === 1 ? 0 : 1,
          likeCount:
            tweet.likedByCurrentUser === 1
              ? tweet.likeCount - 1
              : tweet.likeCount + 1,
        };
      }
      return tweet;
    });

    dispatch(likeCommunityPosts({ communityPostId: postId }));
    setTweets(updatedTweets);
  };

  const [replyText, setReplyText] = useState<string>("");
  const [showReplyInput, setShowReplyInput] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  const handleReply = (postId: number) => {
    setCurrentPostId(postId);
    setShowReplyInput(true);
  };

  const handlePostComment = () => {
    if (currentPostId !== null && replyText) {
      const updatedTweets = tweets.map((tweet) => {
        if (tweet.id === currentPostId) {
          return {
            ...tweet,
            CommunityPostComments: [
              ...tweet.CommunityPostComments,
              {
                id: tweet.CommunityPostComments?.length + 1, // Generate a unique comment ID here
                communityPostId: currentPostId,
                commentedBy: 1, // Replace with the actual user ID
                comment: replyText,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                User: {
                  id: user?.id || 1, // Replace with the actual user ID
                  firstName: user?.firstName || "Test", // Replace with the actual user's name
                  lastName: user?.lastName || "User",
                  fullName: user?.fullName || "Test User",
                },
              },
            ],
          };
        }
        return tweet;
      });

      dispatch(
        commentCommunityPosts({
          communityPostId: currentPostId,
          comment: replyText,
        })
      );
      setTweets(updatedTweets);
      setCurrentPostId(null);
      setReplyText("");
    }
  };

  const handleDeleteTweet = (postId: number) => {
    const updatedTweets = tweets.filter((tweet) => tweet.id !== postId);
    setTweets(updatedTweets);
    dispatch(deleteCommunityPost({ id: postId }));
  };
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.white, COLORS.white]}
    >
      <ImageSetTwo />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={titleText}
          onChangeText={(text) => setTitleText(text)}
          multiline={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={descriptionText}
          onChangeText={(text) => setDescriptionText(text)}
          multiline={true}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTweet}>
          <Text style={styles.addButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={tweets}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={({ item }) => (
            <View style={styles.tweetContainer}>
              <TweetCard
                post={item}
                onLikeToggle={() => handleLikeToggle(item.id)}
                onReply={() => handleReply(item.id)}
                onDelete={() => handleDeleteTweet(item.id)}
                showReplyInput={showReplyInput && currentPostId === item.id}
                replyText={replyText}
                setReplyText={setReplyText}
                handlePostComment={handlePostComment}
              />
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 22,
    elevation: 5,
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 270,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tweetContainer: {
    marginHorizontal: 22,
  },
  tweetText: {
    fontSize: 16,
  },
  likeButton: {
    marginLeft: 10,
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
});
