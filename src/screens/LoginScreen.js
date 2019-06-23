import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Keyboard,
  ScrollView
} from "react-native";
import {
  NavBar,
  Text,
  Input,
  Button,
  Block,
  theme,
  Icon
} from "galio-framework";
import { connect } from "react-redux";

import Gradient from "react-native-linear-gradient";
import { AUTH_DO_LOGIN } from "../store/constant/auth";

const BASE_SIZE = theme.SIZES.BASE;
const GRADIENT_BLUE = ["#6B84CA", "#8F44CE"];
const GRADIENT_COLORS = ["#00C9FF", "#92FE9D"];
const COLOR_WHITE = theme.COLORS.WHITE;
const COLOR_GREY = theme.COLORS.MUTED; // '#D8DDE1';
const INPUT_WIDTH = Dimensions.get("window").width * 0.5;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isShowKeybord: false
    };
  }

  componentDidMount() {
    console.log(this.props.authStore);

    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ isShowKeybord: true });
  };

  _keyboardDidHide = () => {
    alert();
    this.setState({ isShowKeybord: false });
  };

  onSumit = () => {
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.props.login();
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 2000);
      }
    );
  };

  render() {
    const gradientColors = GRADIENT_COLORS;

    return (
      <Block safe flex={1}>
        <KeyboardAvoidingView enabled behavior="height" style={{ flex: 1 }}>
          <Block flex middle style={{ backgroundColor: theme.COLORS.WHITE }}>
            <Block>
              {!this.state.isShowKeybord && (
                <Block
                  shadow={true}
                  shadowColor={"#00C9FF"}
                  middle
                  style={{ paddingBottom: 30 }}
                >
                  <Gradient
                    start={{ x: 0.1, y: 0.35 }}
                    end={{ x: 0.9, y: 0.9 }}
                    // start={[0.45, 0.45]}
                    // end={[0.9, 0.9]}
                    colors={gradientColors}
                    style={[styles.gradient]}
                  >
                    <Icon
                      name="isv"
                      family="antdesign"
                      color={theme.COLORS.WHITE}
                      size={100}
                    />
                  </Gradient>
                  {/* <Text muted h3>
                        Ez.POS
                      </Text> */}
                </Block>
              )}

              <Block>
                <Text muted h3>
                  เข้าสู่ระบบ
                </Text>
              </Block>
              <Input style={styles.input} placeholder="ชื่อผู้ใช้" />
              <Input style={styles.input} placeholder="รหัสผ่าน" />
            </Block>
            <Block>
              <Button
                style={styles.btn}
                loading={this.state.isLoading}
                shadowless={true}
                color={"#00C9FF"}
                radius={10}
                onPress={this.onSumit}
              >
                <Text
                  center
                  bold
                  color={theme.COLORS.WHITE}
                  size={theme.SIZES.FONT + 5}
                >
                  {"เข้าสู่ระบบ"}
                </Text>
              </Button>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: INPUT_WIDTH
  },
  btn: {
    width: INPUT_WIDTH,
    height: 60
  }
});

const mapStateToProps = (state, ownProps) => ({
  authStore: state.auth
});

const mapDispatchToProps = dispatch => ({
  login: () => {
    dispatch({
      type: AUTH_DO_LOGIN,
      payload: {
        userId: 20
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
