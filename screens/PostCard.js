import {React} from 'react';
import {View,Text,RFValue,StyleSheet} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default class PostCard extends React.Componennt {

    constructor(props) {
        super(props);
        this.state = {
          fontsLoaded: false,
          light_theme: true,
          post_id : this.props.post.key,
          post_data : this.props.post.value
        };
    }

    fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
    };

    render() {
        return(
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>
                            <Image
                                source={require("../assets/profile_img.png")}
                                style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={styles.authorNameText}> {this.props.post.author} </Text>
                        </View>
                    </View>
                    <Image source={require("../assets/post.jpeg")} styles={styles.postImage}/>
                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}> {this.props.post.caption} </Text>
                    </View>
                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                            <Text style={styles.likeText}> 12k </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor :  "black"
    },
    cardContainer : {
        flex : 0.85 
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    authorNameText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(18),
        color: "white"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
})
