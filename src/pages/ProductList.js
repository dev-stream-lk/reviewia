import { Collapse, FormControlLabel, FormGroup, List, ListItem, Menu, MenuList, Typography } from '@material-ui/core';
import { Drawer } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Grid, makeStyles } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import React, { useState } from 'react';
import Controls from '../components/Controls';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useForm ,Form } from '../components/useForm';

const drawerWidth = 280;

const useStyles = makeStyles( theme => ({
    wrapper:{
        minHeight: "50vh",
        marginTop: theme.spacing(5)
    },
    filteringSection:{
        width:300
    },
    filterTypo:{
        width: "100%",
        cursor:"pointer"
    },
    productListSection:{
        width: `calc(100% - ${drawerWidth}px)`
    },
    filterForm:{
        padding:0
    },
    filterMenuItem:{
        display:"flex",
        flexDirection:"column",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
      },
      drawerPaper: {
        paddingTop: theme.spacing(5),
        width: drawerWidth,
        marginTop: theme.mixins.toolbar.minHeight,
        marginBottom: 100,
      },
}));


const FiltersMenu = (props) => {

    const classes = useStyles();
    const [handleCollapseByRating, setHandleCollapseByRating] = useState(false);
    const [byRating, setByRating] = useState(0);
    const [handleCollapseByCategory, setHandleCollapseByCategory] = useState(false);
    const [byCategory, setByCategory] = useState(0);

    return (
        <List>
            <ListItem disableRipple={false} className={classes.filterMenuItem}>
                <Grid container>
                    <Typography variant="subtitle1" component="div" className={classes.filterTypo} onClick={() => setHandleCollapseByRating(!handleCollapseByRating)}>
                        By Rating
                    </Typography>
                </Grid>
                <Grid container>
                    <Collapse in={handleCollapseByRating} timeout="auto">
                        <Rating
                            value={byRating}
                            name="byRating"
                            precision={0.25}
                            onChange={ (e,value) => setByRating(value)}
                        >

                        </Rating>
                    </Collapse>
                </Grid>
            </ListItem>

            {/* Start ByCategory */}
            <ListItem disableRipple={false} className={classes.filterMenuItem}>
                <Grid container>
                    <Typography variant="subtitle1" component="div" className={classes.filterTypo} onClick={() => setHandleCollapseByCategory(!handleCollapseByCategory)}>
                        By Category
                    </Typography>
                </Grid>
                <Grid container>
                    <Collapse in={handleCollapseByCategory} timeout="auto">
                    <FormGroup>
                        <FormControlLabel
                            control={<Controls.Checkbox checked={false}  name="electronics" />}
                            label="Electronics"
                        />
                        <FormControlLabel
                            control={<Controls.Checkbox checked={true}  name="vehicles" />}
                            label="Vehicles"
                        />
                        <FormControlLabel
                            control={<Controls.Checkbox checked={false}  name="others" />}
                            label="Others"
                        />
                        </FormGroup>
                    </Collapse>
                </Grid>
            </ListItem>
            {/* End Bycategory */}
        </List>
    )
}


export default function ProductList() {

    const classes = useStyles();

    return (
        <>
        <Header></Header>
            <Grid container className={`${classes.wrapper} content`}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Typography variant="h5" component="div">
                        Filter Products
                    </Typography>
                    <Form className={classes.filterForm}>
                        <FiltersMenu/>
                    </Form>
                </Drawer>
                <div className={classes.productListSection}>
                    <Controls.Paper>
                    </Controls.Paper>
                </div>
            </Grid>
        <Footer></Footer>
        </>
    )
}
