import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import firebase from 'firebase';
import db from 'config'
import {Card} from 'react-native-elements';

export default class Receiver extends React.Component{
    constructor(props){
        super(props)
        this.state={
            UserId: firebase.auth().currentUser.email,
            ReceiverId: this.props.navigation.getParam('details')["UserId"],
            Description: this.props.navigation.getParam('details')["ItemName"],
            RequestId: this.props.navigation.getParam('details')["RequestId"],
            ReceiverName:"",
            ReceiverPhoneNumber:"",
            ReceiverAddress:"",
            RequestDocId: ""
        }
    }

getReceiverDetails=()=>{
    db.collection('users').where('UserId', '==', this.state.ReceiverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                ReceiverName:doc.data().Username,
                ReceiverPhoneNumber:doc.data().PhoneNumber,
                ReceiverAddress:doc.data().Address,
            })
        })
    })
    db.collection('Barter_Items').where('RequestId', '==', this.RequestId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                RequestDocId:doc.id
            })
        })
    })
}

componentDidMount(){
    this.getReceiverDetails()
}

render(){
    return(
        <View style={{flex:1, marginTop: 80}}>
        <View style={{flex:0.3}}>
      <Card>
        <Card
        title={"Item Information:"}
        titleStyle={{fontSize:24.531}}
        >    
        </Card>
      <Card>
            <Text>
                Item Name: {this.state.Description}
            </Text>
        </Card>
        <Card>
            <Text>
                Receiver Name: {this.state.ReceiverName}
            </Text>
        </Card>
        <Card>
            <Text>
                Description: {this.state.Description}
            </Text>
        </Card>
        <Card>
            <Text>
                Phone Number: {this.state.ReceiverPhoneNumber}
            </Text>
        </Card>
        <Card>
            <Text>
                Address: {this.state.ReceiverAddress}
            </Text>
        </Card>
        </Card>
      
        </View>
            <TouchableOpacity
            style={styles.text}
            onPress={()=>{
                this.props.navigation.navigate('Home')
            }}
            >
                <Text>Back To All Requests</Text>
            </TouchableOpacity>
        </View>
    )
}






}


const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"#00873E"
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'#c54245',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center",
        marginTop: 525
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:"#00873E"
    }
})
