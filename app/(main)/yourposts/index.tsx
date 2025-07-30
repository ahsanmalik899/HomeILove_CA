/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { hs, ms, vs } from '@utils/design/design';
import { router } from 'expo-router/build/exports';
import { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Define image paths for icons (replace with your actual asset paths)
export const ICON_PATHS = {
  back: require('@assets/Feedimg/Vector 7451.png'),
  notification: require('@assets/Feedimg/Vector (2).png'),
  ellipsis: require('@assets/Feedimg/dots.png'),
  thumbsUp: require('@assets/Feedimg/Like button (1).png'),
  chatbubble: require('@assets/Feedimg/comment.png'),
  share: require('@assets/Feedimg/Vector.png'),
  send: require('@assets/Feedimg/arrow.png'),
  videocam: require('@assets/Feedimg/Vector (1).png'),
  image: require('@assets/Feedimg/Group.png'),
  profileIcon: require('@assets/Feedimg/Vector (3).png'),
};

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  post: Post; // Replace `any` with `Post`
  onSave: (id: string, content: string) => void;
}
const EditPostModal = ({ visible, onClose, post, onSave }: EditModalProps) => {
  const [editedContent, setEditedContent] = useState(post?.content || '');
  const MAX_CHARS = 2000;
  const remainingChars = MAX_CHARS - editedContent.length;

  const handleSave = () => {
    if (editedContent.trim()) {
      onSave(post.id, editedContent);
      onClose();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={editModalStyles.modalOverlay}>
        <View style={editModalStyles.modalContainer}>
          <View style={editModalStyles.header}>
            <Text style={editModalStyles.title}>Edit Post</Text>
            <TouchableOpacity onPress={onClose} style={editModalStyles.closeButton}>
              <Text style={editModalStyles.close}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={editModalStyles.line} />
          <Text style={editModalStyles.descriptionLabel}>Description</Text>
          <View style={editModalStyles.postInputContainer}>
            <TextInput
              placeholder="Write your description"
              placeholderTextColor="#666666"
              style={editModalStyles.postInput}
              value={editedContent}
              onChangeText={setEditedContent}
              multiline
              maxLength={MAX_CHARS}
              accessibilityLabel="Edit post input"
            />
          </View>
          <Text style={editModalStyles.charRemaining}>
            Characters remaining: {remainingChars}
          </Text>
          <View style={editModalStyles.mediaActions}>
            <TouchableOpacity style={editModalStyles.iconRow} accessibilityLabel="Add image">
              <Image source={ICON_PATHS.image} style={editModalStyles.smallIcon} />
              <Text style={editModalStyles.iconLabel}>Image</Text>
            </TouchableOpacity>
            <View style={editModalStyles.dividerLine} />
            <TouchableOpacity style={editModalStyles.iconRow} accessibilityLabel="Add video">
              <Image source={ICON_PATHS.videocam} style={editModalStyles.smallIcon} />
              <Text style={editModalStyles.iconLabel}>Video</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={editModalStyles.updateButton}
            onPress={handleSave}
            accessibilityLabel="Update post"
          >
            <Text style={editModalStyles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ visible, onClose, onConfirm, postId }) => {
  const handleConfirm = () => {
    onConfirm(postId);
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={deleteModalStyles.modalOverlay}>
        <View style={deleteModalStyles.modalContainer}>
          <Text style={deleteModalStyles.title}>Delete Post?</Text>
          <Text style={deleteModalStyles.message}>Are you sure to delete this post!!!</Text>
          <View style={deleteModalStyles.buttonContainer}>
            <TouchableOpacity
              style={deleteModalStyles.confirmButton}
              onPress={handleConfirm}
              accessibilityLabel="Confirm deletion"
            >
              <Text style={deleteModalStyles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={deleteModalStyles.cancelButton}
              onPress={onClose}
              accessibilityLabel="Cancel deletion"
            >
              <Text style={deleteModalStyles.cancelButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PostScreen = () => {
  const [postText, setPostText] = useState('');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Your Posts'); // Default to "Your Posts"
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: 'Username',
      userType: 'Agent',
      time: '3 hours ago',
      content: 'Traditional performances, food stalls, and light up Berlin this weekend.....Read More',
      image: require('@assets/Feedimg/image.png'),
      bedrooms: '4 bedroom House in for sale',
      price: '$75000',
      likes: 153,
      comments: 22,
      showImage: true,
    },
    {
      id: '2',
      username: 'Username',
      userType: 'Agent',
      time: '5 hours ago',
      content: 'Exciting cultural events and local markets in Paris this weekend.....Read More',
      image: require('@assets/Feedimg/image.png'),
      bedrooms: '3 bedroom Apartment in for sale',
      price: '$65000',
      likes: 120,
      comments: 15,
      showImage: true,
    },
  ]);

  const handlePostSubmit = () => {
    if (postText.trim()) {
      console.log('Posting:', postText);
      setPosts((prevPosts) => [
        {
          id: String(Date.now()),
          username: 'Current User',
          userType: 'Agent',
          time: 'Just now',
          content: postText,
          image: null,
          bedrooms: '',
          price: '',
          likes: 0,
          comments: 0,
          showImage: false,
        },
        ...prevPosts,
      ]);
      setPostText('');
    }
  };

  const handleTabPress = (tab: string) => {
    if (tab === 'NewsFeed') {
      router.push('/(main)/feedsScreen'); // Navigate to NewsFeed screen
    } else if (tab === 'Content') {
      router.push('/content'); // Navigate to Content screen
    } else if (tab === 'Newsfeed Preferences') {
      router.push('/preferences'); // Navigate to Newsfeed Preferences screen
    } else if (tab !== activeTab) {
      setActiveTab(tab); // Update active tab only if it's different
      console.log(`Switched to tab: ${tab}`);
    }
  };

  const handleBackPress = () => {
    router.back(); // Always go back to the previous screen in the stack
  };

  const handleEditPost = (postId: string) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditingPost(postToEdit);
    setEditModalVisible(true);
    setMenuVisible(null);
  };

  const handleSaveEdit = (postId: string, newContent: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
  };

  const handleDeletePost = (postId: SetStateAction<string | null>) => {
    setDeletingPostId(postId);
    setDeleteModalVisible(true);
    setMenuVisible(null);
  };

  const handleConfirmDelete = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const tabWidth = width / 4;
  const tabPositions = {
    NewsFeed: 0,
    'Your Posts': tabWidth,
    Content: tabWidth * 2,
    'Newsfeed Preferences': tabWidth * 3,
  };

  const renderPost = ({ item }) => {
    return (
      <View>
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.row}>
              <View style={styles.avatar} />
              <View style={{ marginLeft: hs(12) }}>
                <Text style={styles.username}>
                  {item.username} <Text style={styles.agentText}>posted new post</Text>
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity
                onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}
                accessibilityLabel="Post options"
              >
                <Image source={ICON_PATHS.ellipsis} style={styles.icon} />
              </TouchableOpacity>
              {menuVisible === item.id && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    style={styles.dropdownItemContainer}
                    onPress={() => handleEditPost(item.id)}
                    accessibilityLabel="Edit post"
                  >
                    <Text style={styles.dropdownItem}>Edit Post</Text>
                  </TouchableOpacity>
                  <View style={styles.dropdownDivider} />
                  <TouchableOpacity
                    style={styles.dropdownItemContainer}
                    onPress={() => handleDeletePost(item.id)}
                    accessibilityLabel="Delete post"
                  >
                    <Text style={styles.dropdownItem}>Delete Post</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <Text style={styles.contentText}>
            {item.content.includes('.....Read More') ? (
              <>
                {item.content.split('.....Read More')[0]}
                <Text style={styles.readMore}>.....Read More</Text>
              </>
            ) : (
              item.content
            )}
          </Text>
          {item.showImage && (
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.postImage} />
              <View style={styles.overlayContainer}>
                <Text style={styles.bedroomText}>{item.bedrooms}</Text>
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </View>
          )}
          <View style={styles.footerIcons}>
            <View style={styles.iconButtonsContainer}>
              <TouchableOpacity style={styles.iconWithCount} accessibilityLabel="Like post">
                <Image source={ICON_PATHS.thumbsUp} style={styles.icon} />
                <Text style={styles.footerCount}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconWithCount} accessibilityLabel="Comment on post">
                <Image source={ICON_PATHS.chatbubble} style={styles.icon} />
                <Text style={styles.footerCount}>{item.comments}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity accessibilityLabel="Share post">
              <Image source={ICON_PATHS.share} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.commentSection}>
            <View style={styles.commentAvatar} />
            <View style={styles.commentBox}>
              <TextInput
                placeholder="Write your comment"
                placeholderTextColor="#666666"
                style={styles.commentInput}
                multiline
                accessibilityLabel="Comment input"
              />
              <TouchableOpacity style={styles.sendButton} accessibilityLabel="Send comment">
                <Image source={ICON_PATHS.send} style={styles.sendIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          accessibilityLabel="Go back to previous screen"
        >
          <Image source={ICON_PATHS.back} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Feed</Text>
        <View style={styles.notificationContainer}>
          <Image source={ICON_PATHS.notification} style={styles.icon} />
          <View style={styles.notificationDot} />
        </View>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={activeTab === 'NewsFeed' ? styles.activeTabContainer : null}
          onPress={() => handleTabPress('NewsFeed')}
          accessibilityLabel="NewsFeed tab"
        >
          <Text style={activeTab === 'NewsFeed' ? styles.activeTab : styles.inactiveTab}>
            NewsFeed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'Your Posts' ? styles.activeTabContainer : null}
          onPress={() => handleTabPress('Your Posts')}
          accessibilityLabel="Your Posts tab"
        >
          <Text style={activeTab === 'Your Posts' ? styles.activeTab : styles.inactiveTab}>
            Your Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'Content' ? styles.activeTabContainer : null}
          onPress={() => handleTabPress('Content')}
          accessibilityLabel="Content tab"
        >
          <Text style={activeTab === 'Content' ? styles.activeTab : styles.inactiveTab}>
            Content
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === 'Newsfeed Preferences' ? styles.activeTabContainer : null}
          onPress={() => handleTabPress('Newsfeed Preferences')}
          accessibilityLabel="Newsfeed Preferences tab"
        >
          <Text
            style={activeTab === 'Newsfeed Preferences' ? styles.activeTab : styles.inactiveTab}
          >
            Newsfeed Preferences
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.redIndicatorLine,
            { left: tabPositions[activeTab], width: tabWidth },
          ]}
        />
      </View>
      <View style={styles.createPostCard}>
        <View style={styles.createPostHeader}>
          <Text style={styles.createPostHeading}>Create Post</Text>
        </View>
        <View style={styles.postInputContainer}>
          <Image source={ICON_PATHS.profileIcon} style={styles.profileIcon} />
          <TextInput
            placeholder="What's up, Name?"
            placeholderTextColor="#666666"
            style={styles.postInput}
            value={postText}
            onChangeText={setPostText}
            multiline
            accessibilityLabel="Create post input"
          />
        </View>
        <View style={styles.postActions}>
          <View style={styles.mediaActions}>
            <TouchableOpacity style={styles.iconRow} accessibilityLabel="Add image">
              <Image source={ICON_PATHS.image} style={styles.smallIcon} />
              <Text style={styles.iconLabel}>Image</Text>
            </TouchableOpacity>
            <View style={styles.dividerLine} />
            <TouchableOpacity style={styles.iconRow} accessibilityLabel="Add video">
              <Image source={ICON_PATHS.videocam} style={styles.smallIcon} />
              <Text style={styles.iconLabel}>Video</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.postButton}
            onPress={handlePostSubmit}
            accessibilityLabel="Submit post"
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
      <EditPostModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        post={editingPost}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        postId={deletingPostId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: hs(16),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(21),
    marginTop: vs(55),
  },
  headerTitle: {
    fontSize: ms(22),
    fontWeight: 'bold',
    color: '#000',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: ms(8),
    height: ms(8),
    borderRadius: ms(8),
    backgroundColor: '#4CAF50',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: vs(58),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: vs(18),
    position: 'relative',
    marginTop: vs(20),
    paddingHorizontal: 0,
  },
  activeTabContainer: {
    paddingBottom: vs(8),
  },
  activeTab: {
    color: '#cc0033',
    fontWeight: 'bold',
    fontSize: ms(12),
  },
  inactiveTab: {
    color: '#666',
    fontSize: ms(12),
  },
  redIndicatorLine: {
    position: 'absolute',
    bottom: -1,
    height: 2,
    backgroundColor: '#cc0033',
  },
  createPostCard: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: hs(16),
    marginBottom: vs(23),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 3,
  },
  createPostHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  createPostHeading: {
    fontSize: ms(20),
    fontWeight: 'bold',
    color: '#000',
  },
  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: vs(12),
    position: 'relative',
  },
  profileIcon: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
    position: 'absolute',
    left: hs(15),
    top: vs(20),
    zIndex: 1,
  },
  postInput: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderRadius: ms(20),
    paddingHorizontal: hs(50),
    paddingLeft: hs(60),
    paddingVertical: vs(18),
    minHeight: vs(70),
    textAlignVertical: 'top',
    fontSize: ms(16),
    color: '#000000',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vs(15),
  },
  mediaActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(4),
  },
  dividerLine: {
    width: 1,
    height: vs(25),
    backgroundColor: '#ccc',
    marginHorizontal: hs(15),
  },
  smallIcon: {
    width: ms(28),
    height: ms(28),
    resizeMode: 'contain',
  },
  iconLabel: {
    fontSize: ms(12),
    color: '#009688',
  },
  postButton: {
    backgroundColor: '#cc0033',
    paddingVertical: vs(12),
    paddingHorizontal: hs(43),
    borderRadius: ms(10),
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: ms(14),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: hs(16),
    marginBottom: vs(23),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  avatar: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: '#e0e0e0',
  },
  username: {
    fontWeight: 'bold',
    fontSize: ms(14),
    color: '#000000',
  },
  agentText: {
    color: '#666',
    fontWeight: 'normal',
  },
  timeText: {
    fontSize: ms(12),
    color: '#666',
    marginTop: vs(2),
  },
  contentText: {
    fontSize: ms(13),
    color: '#333',
    lineHeight: vs(18),
    textAlign: 'justify',
    letterSpacing: -0.1,
    marginTop: vs(8),
  },
  readMore: {
    color: 'black',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    marginTop: vs(12),
  },
  postImage: {
    width: '100%',
    height: vs(200),
    borderRadius: ms(12),
  },
  overlayContainer: {
    position: 'absolute',
    bottom: vs(10),
    left: hs(10),
    right: hs(10),
    backgroundColor: 'rgba(108, 102, 102, 0.6)',
    borderRadius: ms(20),
    padding: hs(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bedroomText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
  priceText: {
    color: '#fff',
    fontSize: ms(16),
    fontWeight: 'bold',
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(16),
    paddingTop: vs(12),
  },
  iconButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWithCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: hs(20),
  },
  footerCount: {
    marginLeft: ms(6),
    color: '#009688',
    fontSize: ms(14),
  },
  commentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(12),
  },
  commentAvatar: {
    width: ms(32),
    height: ms(32),
    borderRadius: ms(16),
    backgroundColor: '#e0e0e0',
    marginRight: hs(10),
  },
  commentBox: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderRadius: ms(20),
    paddingHorizontal: hs(12),
    paddingVertical: vs(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    fontSize: ms(14),
    color: '#000000',
    minHeight: vs(20),
  },
  sendButton: {
    padding: hs(4),
  },
  sendIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    tintColor: '#009688',
  },
  icon: {
    width: ms(19.5),
    height: ms(20.5),
    resizeMode: 'contain',
  },
  menuContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    position: 'absolute',
    top: vs(35),
    right: 0,
    backgroundColor: '#fff',
    borderRadius: ms(8),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: ms(4),
    elevation: 8,
    minWidth: hs(120),
    zIndex: 1001,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dropdownItemContainer: {
    paddingHorizontal: hs(16),
    paddingVertical: vs(12),
  },
  dropdownItem: {
    fontSize: ms(14),
    color: '#333',
    textAlign: 'left',
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: hs(8),
  },
});

const editModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: hs(16),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(12),
  },
  title: {
    fontSize: ms(20),
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    width: ms(40),
    height: ms(40),
    borderRadius: ms(20),
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: hs(5),
  },
  close: {
    fontSize: ms(24),
    color: '#006A70',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: vs(12),
  },
  descriptionLabel: {
    fontSize: ms(16),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: vs(8),
  },
  postInputContainer: {
    marginBottom: vs(8),
  },
  postInput: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    borderRadius: ms(20),
    paddingHorizontal: hs(16),
    paddingVertical: vs(12),
    minHeight: vs(100),
    textAlignVertical: 'top',
    fontSize: ms(16),
    color: '#000000',
  },
  charRemaining: {
    fontSize: ms(12),
    color: '#666',
    textAlign: 'left',
    marginBottom: vs(12),
  },
  mediaActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vs(12),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ms(4),
  },
  dividerLine: {
    width: 1,
    height: vs(25),
    backgroundColor: '#ccc',
    marginHorizontal: hs(15),
  },
  smallIcon: {
    width: ms(28),
    height: ms(28),
    resizeMode: 'contain',
  },
  iconLabel: {
    fontSize: ms(12),
    color: '#009688',
  },
  updateButton: {
    backgroundColor: '#cc0033',
    paddingVertical: vs(12),
    paddingHorizontal: hs(43),
    borderRadius: ms(10),
    alignSelf: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: ms(14),
  },
});

const deleteModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: hs(20),
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontSize: ms(20),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: vs(12),
  },
  message: {
    fontSize: ms(16),
    color: '#333',
    textAlign: 'center',
    marginBottom: vs(20),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#cc0033',
    paddingVertical: vs(10),
    borderRadius: ms(10),
    alignItems: 'center',
    marginRight: hs(10),
  },
  confirmButtonText: {
    fontSize: ms(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0F2F1',
    paddingVertical: vs(10),
    borderRadius: ms(10),
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: ms(16),
    color: '#006A70',
    fontWeight: 'bold',
  },
});

export default PostScreen;