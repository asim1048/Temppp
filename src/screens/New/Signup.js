import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Alert 
  
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Checkbox,useToast } from "native-base";
import auth from '@react-native-firebase/auth';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
  faPhone

} from '@fortawesome/free-solid-svg-icons';

export default function SignUp({navigation}) {
    const toast = useToast();

  const [name, setName] = useState()
  const [contact, setContact] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const [nameOk, setNameOk] = useState(true)
  const [contactOk, setContactOk] = useState(true)
  const [emailOk, setEmailOk] = useState(true)
  const [passwordOk, setPasswordOk] = useState(true)
  const [confirmPasswordOk, setConfirmPasswordOk] = useState(true)
  const [conditions, setConditions] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);

  const handleRegister = async () => {
    console.log('Yes')
    if (
      password.length < 6 ||
      email.length < 4)
      {
          toast.show({
              description: 'Enter credential First!',
              duration: 1000,
          });
          return;
      }
      await auth()
        .createUserWithEmailAndPassword(email.trim(), password)

        .then(userCredential => {

          const user = userCredential.user;

          console.log(user);
          toast.show({
            title: "User created successfully!",
            placement: "bottom",
            duration: 2000,
          })
          // navigation.navigate("Login")
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            toast.show({
                title: "That email address is already in use!",
                placement: "bottom",
                duration: 2000,
              })
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            toast.show({
                title: "That email address is invalid!",
                placement: "bottom",
                duration: 2000,
              })
          }
      
          console.error(error);
        });
  }   

  return (
    <View style={{
      flex: 1,
      backgroundColor:"#006a78",
    }}>
      <View  style={{ flex: 1, backgroundColor:"#006a78", alignItems:'center', justifyContent:"center" }}>
       
        <View style={{
          flex: 0.95,
          borderRadius: 20,
          backgroundColor: '#006a78',
          opacity: 0.8,
          justifyContent:"center"
        }}>

          {/* Lets Get Started */}
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: "bold",
              color: 'white',
              opacity: 1,
            }}>Let's Get Started!</Text>
            <Text style={{
              fontSize: 15,
              color: 'white',
              opacity: 1,
            }}>Create an account to get all features</Text>
          </View>

          {/* Name */}
          <View style={{
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginHorizontal:responsiveWidth(5),
                      }}>
            <TextInput style={{
              width: responsiveWidth(90),
              fontSize: 18,
              color: "white",
              borderColor: 'gray'
            }}
              placeholder="Your Name"
              placeholderTextColor={"white"}
              onChangeText={(value) => { setName(value); if (value.length > 0) setName(false) }}
            />
            <FontAwesomeIcon icon={faUser} size={20} color="white" />
          </View>

          {/* Email Addresss */}
          <View style={{
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginHorizontal:responsiveWidth(5),
          }}>
            <TextInput style={{
              width: responsiveWidth(90),
              fontSize: 18,
              color: "white",
              borderColor: 'gray'
            }}
              placeholder="Email Adress"
              placeholderTextColor={"white"}
              onChangeText={(value) => {setEmail(value);console.log(email); }}
            />
            <FontAwesomeIcon icon={faEnvelope} size={20} color="white" />
          </View>

          {/* Phone Number */}
          <View style={{
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            borderBottomWidth: 1,
            marginHorizontal:responsiveWidth(5),
                      }}>
            <TextInput style={{
              width: responsiveWidth(90),
              fontWeight: 'bold',
              color: "white",
              borderColor: 'gray'
            }}
              placeholder="Phone Number"
              placeholderTextColor={"white"}
              onChangeText={(value) => { setContact(value); if (value.length > 0) setContactOk(false) }}
            />
            <FontAwesomeIcon icon={faPhone} size={20} color="white" />
          </View>

          {/*Password */}
          <View style={{
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            marginHorizontal:responsiveWidth(5),          }}>
            <TextInput style={{
              width: responsiveWidth(90),
              fontSize: 18,
              color: "white",
              borderColor: 'gray'
            }}
              secureTextEntry={!hidePassword}
              placeholder="Password"
              placeholderTextColor={"white"}
              onChangeText={(value) => setPassword(value)}
            />
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} size={20} color="white" />
            </TouchableOpacity>
          </View>

          

        

          {/*SignUp */}
          <View style={{
                marginTop: 25,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',

                marginHorizontal:responsiveWidth(5),              }}>
                <TouchableOpacity style={{
                  width: responsiveWidth(90),
                  height: 45,
                  backgroundColor: '#0E1B41',
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                  onPress={() =>handleRegister() }
                >
                  <Text style={{
                    color: 'white',
                    fontSize: 19,
                    fontWeight: 'bold'
                  }}>SIGN UP</Text>
                </TouchableOpacity>
              </View>

              {/*Login  */}
              <View style={{
                marginTop: 25,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  color: 'white',
                  fontSize: 13,
                }}>Already have an account?</Text>
                <TouchableOpacity  onPress={() => navigation.navigate("Login")}>
                  <Text style={{
                    color: '#000a75',
                    fontSize: 19,
                    fontWeight: 'bold',
                    marginLeft: 5,
                  }}>Login Here</Text>
                </TouchableOpacity>
              </View>

        </View>
      </View>
    </View>
  );
};


