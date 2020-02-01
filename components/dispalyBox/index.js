Component({
  properties:{
    imgUrl:{
      type:String,
      value:'http://i1.hdslb.com/bfs/archive/6d52cabe98f4c99c44e187aa937de3eaba15379d.jpg'
    },
    title:{
      type:String,
      value:'买到一批假口罩，我直接把团伙送到警察局！'
    },
    hotDesc:{
      type:String,
      value:'百万播放'
    },
    authorName:{
      type: String,
      value: '波桑吃遍世界'
    },
    viewNb:{
      type:Number,
      value: 2165464
    },
    pubdate: {
      type: Number,
      value: 1580498885
    },
    duration:{
      type:Number,
      value: 276
    }
  },
  formateViewNb(num){
    return num
  }
})