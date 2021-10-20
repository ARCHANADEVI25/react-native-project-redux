import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { changeCount } from './actions/counts';
import { bindActionCreators } from 'redux';
const listTab = [{
  id:1,
  name:'LOANED ITEMS',
  status:"loaned"
},{
  id:2,
  name:'AVAILABLE ITEMS',
  status:"available"
}];
const data = [{
  id:1,
  name:"Midi Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/Midi-Dress.jpg",
},{
  id:2,
  name:"Off the Shoulder",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/Off-the-shoulder-dress.jpg",
},{
  id:3,
  name:"Shift Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/12/Shift-Dress-.jpg",
},{
  id:4,
  name:"Bodycon Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/12/Bodycon-1.jpg",
},{
  id:5,
  name:"A-Line Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/A-Line-dress.jpg",
},{
  id:6,
  name:"Mini Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/12/Mini-Dress-1-1.jpg",
},{
  id:7,
  name:"Maxi Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/Maxi-Dress.jpg",
},{
  id:8,
  name:"Wrap Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/Wrap-Dress.jpg",
},{
  id:9,
  name:"Halter Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/Halter-Neck.jpg",
},{
  id:10,
  name:"High-Low Dress",
  url:"https://www.thetrendspotter.net/wp-content/uploads/2018/11/High-Low-dress.jpg",
}];
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedIndex: 0,
        status:'loaned'
    }
  }
  setStatus=(status)=>{
    this.setState({status:status});
    let { count, actions } = this.props;
    if(status=='loaned'){
      count.loanedCount = 10;
      count.availableCount = 0;
    }else{
      count.loanedCount = 0;
      count.availableCount = 10;
    }
    actions.changeCount(count.count);
    this.renderFlatList();
  }
  renderFlatList =()=>{
    return (
      <FlatList
              style={{backgroundColor:'lightgray'}}
              data={data}
              keyExtractor={(e,i)=> i.toString()}
              renderItem={(e,i)=>this.renderItem(e,i)}
            />
    )
  }
  renderItem = ({item})=>{
      return(
          <Card>
          <Card.Title>{item.name}</Card.Title>
          <Card.Divider/>
          <Card.Image source={{uri:item.url}}>
          </Card.Image>
        </Card>
      )
  }
  render() {
    const { count } = this.props;
    return (
        <SafeAreaView style={styles.container}>
          <View style={{width: '100%', height: 40, backgroundColor: 'white',marginTop:10,marginBottom:10}}>
            <Text style={{alignSelf:'center',fontWeight:'bold',fontSize:20}}>My Closet</Text>
            <Text style={{alignSelf:'center',fontWeight:'100',fontSize:15}}>
             {'Total Item : '} {data.length} {' Loaned Item : '} {count.loanedCount} {' Available Item : '} {count.availableCount}</Text>
          </View>
          <View style={styles.listTab}>
            {
              listTab.map(val=>(
              <TouchableOpacity 
                style={[styles.btnTab,this.state.status === val.status && styles.btnTabActive]}
                onPress={()=>this.setStatus(val.status)}>
                <Text style={styles.textTab, this.state.status=== val.status && styles.textTabActive}>{val.name}</Text>
              </TouchableOpacity>
              ))
            }
            </View>
            {this.renderFlatList()}
        </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal:10
  },
  listTab:{ 
    flexDirection:'row',
    alignSelf:'center',
    marginBottom:20,
  },
  btnTab:{
    width:Dimensions.get('window').width/2.5,
    flexDirection:'row',
    borderWidth:0.5,
    borderColor:'#EBEBEB',
    padding:10,
    justifyContent:'center'
  },
  textTab:{
    fontSize:16
  },
  btnTabActive:{
    backgroundColor:'#E6838D'
  },
  textTabActive:{
    color:"white"
  },
  itemImage:{
    width:50,
    height:50,
    margin:20
  },
  itemName: {
    fontSize:16,
    fontWeight:'bold',
    margin:0
  }
});

const mapStateToProps = state => ({
  count: state.count,
});

const ActionCreators = Object.assign(
  {},
  {changeCount},
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)