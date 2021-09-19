import { Divider, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import AdvancedBarChart from '../../components/AdvanceBarChart';
import Controls from '../../components/Controls';
import SimpleBarChart from '../../components/SimpleBarChart';
import { getDate } from '../../utils/dateTime';

const useStyles = makeStyles( (theme) => ({
    paperBox:{
        width:"100%"
    },
    statisticTile:{
        minHeight:100,
        cursor:"pointer"
    },
    statTileWrapper:{
        margin:10
    },
    selectedTile:{
        background:"#ddd"
    }
}));

// Start statistic count
const StatisticCounts = (props) => {
    const classes = useStyles();
    const {selected, setSelected} = props;

    return (
        <Controls.Paper boxClassName={classes.paperBox}>
            <Grid container justifyContent="center" >
                {/* start user count */}
                <Grid item xs={6} sm={4} md={3}>
                    <div  className={classes.statTileWrapper}>
                        <Controls.Paper onClick={() => setSelected("user")} className={`${classes.statisticTile} ${selected==="user" ? classes.selectedTile : null} `} boxClassName={classes.paperBox}>
                            <Typography variant="h6">
                                Users
                            </Typography>
                            <Divider style={{height:2}} />
                            <Typography variant="subtitle1">
                                45
                            </Typography>
                        </Controls.Paper>
                    </div>
                </Grid>
                {/* end user count */}

                {/* start Post count */}
                <Grid item xs={6} sm={4} md={3}>
                    <div  className={classes.statTileWrapper}>
                        <Controls.Paper onClick={() => setSelected("post")} className={`${classes.statisticTile} ${selected==="post" ? classes.selectedTile : null} `} boxClassName={classes.paperBox}>
                            <Typography variant="h6">
                                Posts
                            </Typography>
                            <Divider style={{height:2}} />
                            <Typography variant="subtitle1">
                                45
                            </Typography>
                        </Controls.Paper>
                    </div>
                </Grid>
                {/* end post count */}

                {/* start Review count */}
                <Grid item xs={6} sm={4} md={3}>
                    <div className={classes.statTileWrapper}>
                    <Controls.Paper onClick={() => setSelected("review")} className={`${classes.statisticTile} ${selected==="review" ? classes.selectedTile : null} `} boxClassName={classes.paperBox}>
                            <Typography variant="h6">
                                Reviews
                            </Typography>
                            <Divider style={{height:2}} />
                            <Typography variant="subtitle1">
                                2399
                            </Typography>
                        </Controls.Paper>
                    </div>
                </Grid>
                {/* end review count */}

                {/* start category count */}
                <Grid item xs={6} sm={4} md={3}>
                    <div className={classes.statTileWrapper}>
                        <Controls.Paper onClick={() => setSelected("category")} className={`${classes.statisticTile} ${selected==="category" ? classes.selectedTile : null} `} boxClassName={classes.paperBox}>
                            <Typography variant="h6">
                                Categories
                            </Typography>
                            <Divider style={{height:2}} />
                            <Typography variant="subtitle1">
                                20
                            </Typography>
                        </Controls.Paper>
                    </div>
                </Grid>
                {/* end category count */}

                {/* start sub category count */}
                <Grid item xs={6} sm={4} md={3}>
                    <div className={classes.statTileWrapper}>
                        <Controls.Paper style={{cursor:"default"}} className={`${classes.statisticTile}`} boxClassName={classes.paperBox}>
                            <Typography variant="h6">
                                Sub Categories
                            </Typography>
                            <Divider style={{height:2}} />
                            <Typography variant="subtitle1">
                                20
                            </Typography>
                        </Controls.Paper>
                    </div>
                </Grid>
                {/* end sub category count */}
            </Grid>
        </Controls.Paper>
    )
}
// End statistic count

const StatisticFilters = (props) => {

    const selectedMap = [
        {selected:"user", title:"User"},
        {selected:"post", title:"Posts"},
        {selected:"review", title:"Reviews"},
        {selected:"category", title:"Categories"},
        {selected:"subCategory", title:"Sub Categories"},
    ]

    const classes = useStyles();
    const {selected} = props;

    return (
        <Grid container>
            <Controls.Paper boxClassName={classes.paperBox}>
                <Grid container>
                
                </Grid>
                <Grid container>
                    <Grid style={{width:"100%"}}>
                        {/* <SimpleBarChart /> */}
                        <AdvancedBarChart 
                            title={
                                selected === "category" ? 
                                `${selectedMap.filter( s => {
                                    if(s.selected === selected){
                                        return true;
                                    }
                                    return false;
                                })[0].title} (count/category)\n ${getDate(new Date())}`
                                : 
                                `New ${selectedMap.filter( s => {
                                    if(s.selected === selected){
                                        return true;
                                    }
                                    return false;
                                })[0].title} (count/date)\n ${getDate(new Date())}`
                            }
                        />
                    </Grid>
                </Grid>
            </Controls.Paper>
        </Grid>
    )
}


export default function SystemReport() {
    const classes = useStyles();
    const [selected,setSelected] = useState("user");
    return (
        <>
            <Grid container>
                <StatisticCounts selected={selected} setSelected={setSelected} />
            </Grid>
            <Grid container>
                <StatisticFilters selected={selected} />
            </Grid>
        </>
    )
}
