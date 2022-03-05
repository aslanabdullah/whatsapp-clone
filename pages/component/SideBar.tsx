import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import { auth, signOut } from "../../firebase"
import * as validator from "email-validator"
import { db, setDoc, collection, addDoc, getDoc, getDocs, doc, query, where } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect } from "react";
import { useRouter } from "next/router";

function SideBar() {

  const [user] = useAuthState(auth);
  const router = useRouter();

  let chatRef;



  const docSnapF = async () => {
    const q = query(collection(db, "chats"), where("email", "==", user!.email));
    const docSnap = await getDocs(q);
    chatRef = docSnap;
    
    debugger
  }

  useEffect(() => {
    async function fetchMyAPI() {
      await docSnapF();
    }
    fetchMyAPI();
    debugger
  });
  

  const signOutApp = () => {
		signOut(auth);
		router.push("/");
	};
  
 
    

    const [chatSnapShot] = useCollection(chatRef);
    debugger

    const createChat = async() => {
      const input = prompt("Please enter a email adress for user wish to chat with");
      if (!input) {
        return null;
      }

      if (validator.validate(input) && input !== user!.email) {        
        try {
          const usersRef = collection(db, "chats");
          const docRef = await addDoc(usersRef, {
            email: user!.email,
            input
          });
          console.log("Document written with ID: ", docRef);
        } catch (e) {
          alert("Error adding document: ");
        }

      }
    }

    //createChat();
    return (
        <Container >
          <Header>
          <UserAvatar src={user!.photoURL} onClick={signOutApp} />
            <IconContainer>
              <IconButton>
                <ChatIcon></ChatIcon>   
              </IconButton>
              <IconButton>
                <MoreVertIcon></MoreVertIcon>
              </IconButton>                       
            </IconContainer>                          
          </Header>
          <Search>
            <SearchIcon/>
            <SearchInput placeholder="Search in chats"/>
          </Search>
          <SideBarButton>Start a New Chat</SideBarButton>
        </Container >
    );
  }
  
  export default SideBar;
  

  const Container  = styled.div``;
  const Header  = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: white;   
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid red;
  `;
  const UserAvatar  = styled(Avatar)`
    cursor: pointer;
    :hover {
      opacity: 0.8;
    }
  `;

  const IconContainer  = styled.div``;
  const IconButton  = styled.div``;
  const Search  = styled.div`  
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 2px;

  `;
  const SearchInput  = styled.input`
    outline-witdth: 0px;
    border: none;
    flex: 1;
  `;

  const SideBarButton  = styled(Button)`
    width: 100%;
    &&& {
      border-top: 1px solid red;
      border-bottom: 1px solid red;
    }    
  `;