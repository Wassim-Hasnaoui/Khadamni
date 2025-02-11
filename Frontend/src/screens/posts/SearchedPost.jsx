import React, { useContext,useState,useEffect } from 'react';
import {MyContext} from '../../context/ContextProvider'
import {  View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Button, Modal, TextInput, Platform,Image  } from 'react-native';
import axios from "axios"
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import ShowOnePost from './showOnePost';
const SearchedPost=()=>{
    const {url,countries,jobs,laborerDetails,tokenLaborer}=useContext(MyContext);
    const [countryID,setCountryID]=useState("all")
    const [jobID,setJobID]=useState("all");
    const [allSearchedPosts,setAllSearchedPosts]=useState([]);
    
    useEffect(()=>{
        fetchPosts();
    },[]);
const fetchPosts=async()=>{
    try {
      console.log("country is",countryID);
      console.log("job is",jobID);
        const country=countryID==="all"?null:countryID
        const job=jobID==="all"?null:jobID;
        const response = await axios.post(`${url}/api/posts/searchedPosts`, { countryID:country, jobID:job });
        setAllSearchedPosts(response.data.results);
        console.log("responsedata post",response.data);
        console.log("res posts",response.data.results);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
}
    const AllSearchedPosts=()=>{
        fetchPosts();
    }

    
      const renderItem = ({ item }) =>{
        console.log("itempost",item);
        console.log("itemcomments",item.comments);
        return(
        <View style={styles.postContainer}>
                 <ShowOnePost postId={item.posts_jobID} />

        </View>
      );
}
      return (
        <View style={styles.container}>
          <Picker
            selectedValue={countryID}
            onValueChange={(itemValue)=>setCountryID(itemValue === 'all' ? undefined : itemValue)}
          >
            <Picker.Item label="All Countries" value="all" />
            {countries.map((country) => (
              <Picker.Item key={country.countryID} label={country.countryName} value={country.countryID} />
            ))}
          </Picker>

          <Picker
            selectedValue={jobID}
            onValueChange={(itemValue) => setJobID(itemValue === 'all' ? undefined : itemValue)}
          >
            <Picker.Item label="All Jobs" value="all" />
            {jobs.map((job) => (
              <Picker.Item key={job.jobID} label={job.jobName} value={job.jobID} />
            ))}
          </Picker>
    
          <TouchableOpacity onPress={AllSearchedPosts} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
    
          <FlatList
            data={allSearchedPosts}
            keyExtractor={(item) => item.posts_jobID.toString()}
            renderItem={renderItem}
          />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: '#f8f9fa',
        },
        button: {
          marginTop: 16,
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: '#007bff',
          borderRadius: 8,
          alignItems: 'center',
        },
        buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
        },
        postContainer: {
          padding: 16,
          marginBottom: 16,
          backgroundColor: '#fff',
          borderColor: '#ddd',
          borderWidth: 1,
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 1,
        },
        postImage: {
          height: 200,
          width: '100%',
          borderRadius: 8,
          marginBottom: 8,
        },
        postContent: {
          marginTop: 8,
        },
        postTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 4,
        },
        postDate: {
          fontSize: 14,
          color: '#777',
          marginBottom: 4,
        },
        postAuthor: {
          fontSize: 16,
          color: '#007bff',
          marginBottom: 4,
        },
        postJob: {
          fontSize: 16,
          color: '#555',
          marginBottom: 4,
        },
        postCountry: {
          fontSize: 16,
          color: '#555',
        },
        commentContainer: {
          flexDirection: 'row',
          marginTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          paddingTop: 8,
        },
        commentImage: {
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 8,
        },
        commentContent: {
          flex: 1,
        },
        commentText: {
          fontSize: 14,
          color: '#333',
        },
        commentDate: {
          fontSize: 12,
          color: '#777',
          marginBottom: 4,
        },
        commentAuthor: {
          fontSize: 14,
          color: '#007bff',
          marginBottom: 4,
        },
        commentActions: {
          flexDirection: 'row',
          marginTop: 4,
        },
        commentAction: {
          marginRight: 8,
          fontSize: 14,
          color: '#007bff',
          fontWeight: 'bold',
        },
        commentInput: {
          borderBottomWidth: 1,
          borderBottomColor: '#007bff',
          paddingVertical: 4,
          marginBottom: 8,
          fontSize: 14,
          color: '#333',
        },
      });
      

export default SearchedPost