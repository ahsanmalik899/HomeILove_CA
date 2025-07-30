/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable global-require */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
import { hs, ms, vs } from '@utils/design/design'; // Import design utilities
import { useRouter } from 'expo-router'; // Replace useNavigation with useRouter
import { useEffect, useState } from 'react';
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
const ICON_PATHS = {
  back: require('@assets/Feedimg/Vector 7451.png'),
  backdot: require('@assets/Feedimg/ellipse.png'),
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

// Type definition for ReportModal props
interface ReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReportModal = ({ visible, onClose, onSubmit }: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    'Copyright violation',
    'Scam, fraud or spam',
    'False information',
    'Violence, hate or exploitation',
    'Other',
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.title}>Report This Post</Text>
            <TouchableOpacity onPress={onClose} style={modalStyles.closeButton}>
              <Text style={modalStyles.close}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={modalStyles.line} />
          {reasons.map((reason) => (
            <TouchableOpacity
              key={reason}
              style={modalStyles.option}
              onPress={() => setSelectedReason(reason)}
            >
              <Text
                style={[
                  modalStyles.radioCircle,
                  selectedReason === reason && modalStyles.radioFilled,
                ]}
              >
                {selectedReason === reason ? '●' : '○'}
              </Text>
              <Text style={modalStyles.optionText}>{reason}</Text>
            </TouchableOpacity>
          ))}
          <View style={modalStyles.line} />
          <TouchableOpacity
            style={modalStyles.submitButton}
            onPress={() => onSubmit(selectedReason)}
            disabled={!selectedReason}
          >
            <Text style={modalStyles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const FeedScreen = () => {
  const router = useRouter(); // Use expo-router's router
  const [postText, setPostText] = useState('');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [createPostMenuVisible, setCreatePostMenuVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('NewsFeed');
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: 'Username',
      userType: 'Agent',
      location: '',
      dealingAreas: '',
      rating: '',
      counts: '',
      time: '3 hours ago',
      content: 'Traditional performances, food stalls, and open-air concerts light up Berlin this weekend.....Read More',
      image: require('@assets/Feedimg/image.png'),
      bedrooms: '4 bedroom House in for sale',
      price: '$75000',
      likes: 153,
      comments: 22,
      followed: false,
      showImage: true,
      isHidden: false,
      showUndo: false,
    },
    {
      id: '2',
      username: 'Sure Group Real Estate',
      userType: 'Agent',
      location: 'Baltimore',
      dealingAreas: 'Maryland USA',
      rating: '4/5',
      counts: '25 Counts',
      time: '3 hours ago',
      content: 'Traditional performances, food stalls, and open-air concerts light up Berlin this weekend.....Read More',
      image: require('@assets/Feedimg/image.png'),
      bedrooms: '4 bedroom House in for sale',
      price: '$75000',
      likes: 153,
      comments: 22,
      followed: false,
      showImage: false,
      isHidden: false,
      showUndo: false,
    },
    {
      id: '3',
      username: 'Username',
      userType: 'Agent',
      location: '',
      dealingAreas: '',
      rating: '',
      counts: '',
      time: '3 hours ago',
      content: 'Traditional performances, food stalls, and open-air concerts light up Berlin this weekend.....Read More',
      image: require('@assets/Feedimg/image.png'),
      bedrooms: '4 bedroom House in for sale',
      price: '$75000',
      likes: 153,
      comments: 22,
      followed: false,
      showImage: true,
      isHidden: false,
      showUndo: false,
    },
  ]);

  const handleHidePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isHidden: true, showUndo: true } : post
      )
    );
    setMenuVisible(null);
  };

  const handleUndoHide = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, isHidden: false, showUndo: false } : post
      )
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.showUndo ? { ...post, showUndo: false } : post
        )
      );
    }, 5000);
    return () => clearTimeout(timer);
  }, [posts]);

  const handlePostSubmit = () => {
    if (postText.trim()) {
      console.log('Posting:', postText);
      setPostText('');
    }
  };

  const handleReportSubmit = (reason: string) => {
    if (reason && selectedPostId) {
      console.log(`Reporting post ${selectedPostId} for reason: ${reason}`);
    }
    setReportModalVisible(false);
    setSelectedPostId(null);
  };

  const openReportModal = (postId: string) => {
    setSelectedPostId(postId);
    setMenuVisible(null);
    setReportModalVisible(true);
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'Your Posts') {
      router.push('/(main)/yourposts'); // Navigate to PostScreen when "Your Posts" is clicked
    } else {
      console.log(`Switched to tab: ${tab}`);
    }
  };

  const handleBackPress = () => {
    router.back(); // Navigate back to previous screen
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
        {!item.isHidden && (
          <View style={styles.card}>
            {item.username === 'Sure Group Real Estate' ? (
              <View style={styles.sureGroupContainer}>
                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <View style={styles.avatar} />
                    <View style={{ marginLeft: hs(12) }}>
                      <Text style={styles.username}>
                        {item.username} <Text style={styles.agentText}>({item.userType})</Text>
                      </Text>
                      <Text style={styles.location}>{item.location}</Text>
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.menuContainer}>
                    <TouchableOpacity
                      onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}
                      accessibilityLabel="Post options"
                      accessible
                    >
                      <Image source={ICON_PATHS.ellipsis} style={styles.icon} />
                    </TouchableOpacity>
                    {menuVisible === item.id && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity
                          style={styles.dropdownItemContainer}
                          onPress={() => handleHidePost(item.id)}
                          accessibilityLabel="Hide post"
                        >
                          <Text style={styles.dropdownItem}>Hide</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity
                          style={styles.dropdownItemContainer}
                          onPress={() => openReportModal(item.id)}
                          accessibilityLabel="Report post"
                        >
                          <Text style={styles.dropdownItem}>Report</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.dealingAreasRow}>
                  <Text style={styles.dealingAreasLabel}>Dealing areas</Text>
                  <Text style={styles.dealingAreasValue}>{item.dealingAreas}</Text>
                </View>
                <View style={styles.ratingRow}>
                  <Text style={styles.ratingLabel}>Rating</Text>
                  <View style={styles.ratingRightSection}>
                    <Text style={styles.counts}>{item.counts}</Text>
                  </View>
                </View>
                <View style={styles.starsRow}>
                  <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        style={[styles.star, { color: star <= 4 ? '#009688' : '#E0E0E0' }]}
                      >
                        ★
                      </Text>
                    ))}
                    <Text style={styles.ratingText}> {item.rating}</Text>
                  </View>
                </View>
                <View style={styles.separatorLine} />
                <View style={styles.unfollowButtonContainer}>
                  <TouchableOpacity style={styles.unfollowButton} accessibilityLabel="Unfollow">
                    <Text style={styles.unfollowButtonText}>Unfollow</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <View style={styles.avatar} />
                    <View style={{ marginLeft: hs(12) }}>
                      <Text style={styles.username}>
                        {item.username} <Text style={styles.agentText}>({item.userType})</Text>
                      </Text>
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                  <View style={styles.menuContainer}>
                    <TouchableOpacity
                      onPress={() => setMenuVisible(menuVisible === item.id ? null : item.id)}
                      accessibilityLabel="Post options"
                      accessible
                    >
                      <Image source={ICON_PATHS.ellipsis} style={styles.icon} />
                    </TouchableOpacity>
                    {menuVisible === item.id && (
                      <View style={styles.dropdown}>
                        <TouchableOpacity
                          style={styles.dropdownItemContainer}
                          onPress={() => handleHidePost(item.id)}
                          accessibilityLabel="Hide post"
                        >
                          <Text style={styles.dropdownItem}>Hide</Text>
                        </TouchableOpacity>
                        <View style={styles.dropdownDivider} />
                        <TouchableOpacity
                          style={styles.dropdownItemContainer}
                          onPress={() => openReportModal(item.id)}
                          accessibilityLabel="Report post"
                        >
                          <Text style={styles.dropdownItem}>Report</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
                <Text style={styles.contentText}>
                  {item.content.includes('Read More') ? (
                    <>
                      {item.content.split('Read More')[0]}
                      <Text style={[styles.readMore, { marginLeft: 4 }]}>Read More</Text>
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
              </>
            )}
          </View>
        )}
        {item.showUndo && (
          <View style={styles.undoCard}>
            <Text style={styles.undoText}>You won't see this post in your News Feed</Text>
            <TouchableOpacity onPress={() => handleUndoHide(item.id)} style={styles.undoButtonContainer} accessibilityLabel="Undo hide">
              <Text style={styles.undoButtonText}>Undo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          accessibilityLabel="Go back"
          accessible
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
      <ReportModal
        visible={reportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onSubmit={handleReportSubmit}
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
  location: {
    fontSize: ms(12),
    color: '#666',
    marginTop: vs(1),
  },
  sureGroupContainer: {
    marginBottom: vs(12),
  },
  dealingAreasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(12),
  },
  dealingAreasLabel: {
    fontSize: ms(14),
    color: '#000',
    fontWeight: '600',
  },
  dealingAreasValue: {
    fontSize: ms(14),
    color: '#666',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vs(12),
  },
  ratingLabel: {
    fontSize: ms(14),
    color: '#000',
    fontWeight: '600',
  },
  ratingRightSection: {
    alignItems: 'flex-end',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: vs(8),
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: ms(16),
    marginRight: ms(2),
  },
  ratingText: {
    fontSize: ms(14),
    color: '#000',
    fontWeight: '500',
    marginLeft: ms(4),
  },
  counts: {
    fontSize: ms(14),
    color: '#666',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: vs(16),
  },
  unfollowButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 0,
  },
  unfollowButton: {
    backgroundColor: '#cc0033',
    paddingHorizontal: hs(30),
    paddingVertical: vs(12),
    borderRadius: vs(10),
  },
  unfollowButtonText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
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
    marginLeft: 4,
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
  undoCard: {
    backgroundColor: '#fff',
    borderRadius: ms(12),
    padding: hs(16),
    marginBottom: vs(23),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  undoText: {
    fontSize: ms(12),
    color: '#666',
  },
  undoButtonContainer: {
    backgroundColor: '#cc0033',
    paddingVertical: vs(8),
    paddingHorizontal: hs(20),
    borderRadius: ms(10),
  },
  undoButtonText: {
    color: '#fff',
    fontSize: ms(14),
    fontWeight: 'bold',
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: ms(10),
    padding: hs(20),
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vs(7),
  },
  title: {
    fontSize: ms(18),
    fontWeight: 'bold',
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
    backgroundColor: '#B0BEC5',
    width: '100%',
    marginVertical: vs(10),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vs(10),
  },
  radioCircle: {
    fontSize: ms(20),
    marginRight: hs(10),
    color: '#26A69A',
  },
  radioFilled: {
    color: '#26A69A',
  },
  optionText: {
    fontSize: ms(16),
  },
  submitButton: {
    backgroundColor: '#BF0A30',
    paddingVertical: vs(10),
    borderRadius: ms(5),
    alignItems: 'center',
    marginTop: vs(20),
    marginLeft: hs(100),
  },
  submitText: {
    color: 'white',
    fontSize: ms(16),
    fontWeight: 'bold',
  },
});

export default FeedScreen;