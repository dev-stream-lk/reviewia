import { Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AdvancedBarChart from "../../components/AdvanceBarChart";
import Controls from "../../components/Controls";
import SimpleBarChart from "../../components/SimpleBarChart";
import { getChartDataDB, getStatCounts } from "../../services/adminSystemReport";
import { getDate, getDateTime } from "../../utils/dateTime";
import {PreLoader} from '../../components/basic/PreLoader';
import DatePicker from "../../components/basic/DatePicker";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    width: "100%",
  },
  statisticTile: {
    minHeight: 100,
  },
  statTileWrapper: {
    margin: 10,
  },
  selectedTile: {
    background: "#ddd",
  },
}));

// Start statistic count
const StatisticCounts = (props) => {
  const classes = useStyles();
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(false);

    useEffect( async () => {
        setLoading(true);
        let res = await getStatCounts();
        console.log(res)
        if(res){
            setCounts(res);
            setLoading(false);
        }
    },[]);

  return (
    <Controls.Paper boxClassName={classes.paperBox} style={{position:"relative"}}>
        <PreLoader loading={loading} />
      <Grid container justifyContent="center">
        {/* start user count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              className={classes.statisticTile}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Users</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{ counts.users ? counts.users:0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end user count */}

        {/* start Post count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              className={classes.statisticTile}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Posts</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.posts ? counts.posts : 0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end post count */}

        {/* start Review count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              className={classes.statisticTile}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Reviews</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.reviews ? counts.reviews: 0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end review count */}

        {/* start category count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              className={classes.statisticTile}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Categories</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.categories ? counts.categories:0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end category count */}

        {/* start sub category count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              style={{ cursor: "default" }}
              className={`${classes.statisticTile}`}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Sub Categories</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.subCategories ? counts.subCategories:0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end sub category count */}

        {/* start instant group count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              style={{ cursor: "default" }}
              className={`${classes.statisticTile}`}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Instant Group</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.chatGroups ? counts.chatGroups:0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end instant group count */}

        {/* start instant group count */}
        <Grid item xs={6} sm={4} md={3}>
          <div className={classes.statTileWrapper}>
            <Controls.Paper
              style={{ cursor: "default" }}
              className={`${classes.statisticTile}`}
              boxClassName={classes.paperBox}
            >
              <Typography variant="h6">Messages</Typography>
              <Divider style={{ height: 2 }} />
              <Typography variant="subtitle1">{counts.messages ? counts.messages:0}</Typography>
            </Controls.Paper>
          </div>
        </Grid>
        {/* end instant group count */}
      </Grid>
    </Controls.Paper>
  );
};
// End statistic count

// post counts
const StatisticFiltersPost = (props) => {
  const selectedMap = [
    { selected: "user", title: "User" },
    { selected: "post", title: "Posts" },
    { selected: "review", title: "Reviews" },
    { selected: "category", title: "Categories" },
    { selected: "subCategory", title: "Sub Categories" },
  ];

  const classes = useStyles();

  const getDateAdded = (x, date=null) => {
    
    let d = new Date();
    if(date){
      d = date;
    }
    d.setDate(d.getDate()+x)
    return d;
  }
  const [startDate, setStartDate] = useState(getDateAdded(-14));
  const [endDate, setEndDate] = useState(new Date);
  const [chartData, setChartData] = useState([]);

  const getDateString = (date) => {
    let y = date.getUTCFullYear();
    let m = `0${date.getMonth() +1}`.slice(-2);
    let d = `0${ date.getDate() }`.slice(-2)

    return `${y}-${m}-${d}`
  }

  const getData = async () => {
    if(startDate && endDate){
      let res = await getChartDataDB("p", getDateString(startDate), getDateString(endDate) );
      console.log(res)
      if(res){
        let data  = []
        for(var d in res){
          let a = d.slice(-5);
          let obj ={};
          obj["date"] = a;
          obj["count"] = res[d];
          data = [...data,obj]
          data = data.slice(-30)
        }
        setChartData(data);
      }
    }
  }

  useEffect(() => {
    getDate();
  }, [])

  return (
    <Grid container>
      <Controls.Paper boxClassName={classes.paperBox}>
        <Grid container style={{marginTop:20, marginBottom:20, paddingLeft:50}} alignItems="flex-end">
          <Grid container item xs={4} alignItems="center" >
            <Typography style={{padding:10}}  component="span">Start Date:</Typography>
            <DatePicker maxDate={endDate} onChange={(e) => setStartDate(e.target.value) } value={ startDate} />
          </Grid>
          <Grid container item xs={4} alignItems="center" >
            <Typography style={{padding:10}}  component="span">End Date:</Typography>
            <DatePicker minDate={startDate} onChange={(e) => setEndDate(e.target.value) } value={endDate} />
          </Grid>
          <Grid container item xs={4} alignItems="center" >
            <Controls.Button onClick={() =>getData()} >
              Search
            </Controls.Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid style={{ width: "100%" }}>
            <AdvancedBarChart
              chartData={chartData}
              title={`Post Count / Date\n${getDateTime(new Date())}`}
            />
          </Grid>
        </Grid>
      </Controls.Paper>
    </Grid>
  );
};

// review counts
const StatisticFiltersReview = (props) => {

  const classes = useStyles();

  const getDateAdded = (x, date=null) => {
    let d = new Date();
    if(date){
      d = date;
    }
    d.setDate(d.getDate()+x)
    return d;
  }
  const [startDate, setStartDate] = useState(getDateAdded(-14));
  const [endDate, setEndDate] = useState(new Date);
  const [chartData, setChartData] = useState([]);

  const getDateString = (date) => {
    let y = date.getUTCFullYear();
    let m = `0${date.getMonth() +1}`.slice(-2);
    let d = `0${ date.getDate() }`.slice(-2)

    return `${y}-${m}-${d}`
  }

  const getData = async () => {
    if(startDate && endDate){
      let res = await getChartDataDB("r", getDateString(startDate), getDateString(endDate) );
      console.log(res)
      if(res){
        let data  = []
        for(var d in res){
          let a = d.slice(-5);
          let obj ={};
          obj["date"] = a;
          obj["count"] = res[d];
          data = [...data,obj]
          data = data.slice(-30)
        }
        setChartData(data);
      }
    }
  }

  useEffect(() => {
    getDate();
  }, [])

  return (
    <Grid container>
      <Controls.Paper boxClassName={classes.paperBox}>
        <Grid container style={{marginTop:20, marginBottom:20, paddingLeft:50}} alignItems="flex-end">
          <Grid container item xs={4} alignItems="center" >
            <Typography style={{padding:10}}  component="span">Start Date:</Typography>
            <DatePicker maxDate={endDate} onChange={(e) => setStartDate(e.target.value) } value={ startDate} />
          </Grid>
          <Grid container item xs={4} alignItems="center" >
            <Typography style={{padding:10}}  component="span">End Date:</Typography>
            <DatePicker minDate={startDate} onChange={(e) => setEndDate(e.target.value) } value={endDate} />
          </Grid>
          <Grid container item xs={4} alignItems="center" >
            <Controls.Button onClick={() =>getData()} >
              Search
            </Controls.Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid style={{ width: "100%" }}>
            <AdvancedBarChart
              chartData={chartData}
              title={`Review Count / Date\n${getDateTime(new Date())}`}
            />
          </Grid>
        </Grid>
      </Controls.Paper>
    </Grid>
  );
};

export default function SystemReport() {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <StatisticCounts/>
      </Grid>
      <Grid container>
        <StatisticFiltersPost />
      </Grid>
      <Grid container>
        <StatisticFiltersReview />
      </Grid>
    </>
  );
}
