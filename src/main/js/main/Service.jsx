import React from "react";
import {url} from "../Urls";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {MuiThemeProvider, Tab, Tabs} from "material-ui";
import {Col, Row, Table} from "react-bootstrap";
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import ReactTable from 'react-table';
//import FloatingActionButton from 'material-ui/FloatingActionButton';
import View from 'react';


let header = {
    "Content-Type": "application/json"
};


class Service extends React.Component {


    constructor() {
        super();
        // this.checkedItem = this.updateCheck.bind(this);
        this.saveBtn = this.saveButton.bind(this);
        this.deleteBtn = this.deleteButton.bind(this);
        this.confDelBtn = this.confirmDeleteBtn.bind(this);
        this.handleCloseDial = this.handleCloseDialog.bind(this);
        this.modifyBtn = this.modifyButton.bind(this);
        this.confModBtn = this.confirmModifyButton.bind(this);
        this.handleClSnackbar = this.handleCloseSnackbar.bind(this);
        //this.openDial3 = this.openDialog3Button.bind(this);
        this.handleIdToDel = this.handleIdToDelete.bind(this);
        this.state = {
            services: [],
            serviceToModify: {},
            update: [],
            idToDelete: [],
            id: '',
            nazwa: '',
            cena: '',
            czas: '',
            nazwaM: '',
            cenaM: '',
            czasM: '',
            openSnackbar: false,
            deleteConfirmDialog: false,
            modifyDialog: false,
            addServiceDialog: false,
            isLoading: true,
            checkedItems: [],
            deleteBtnDisabled: true,
        }
    }

    updateCheck(event, bool, id) {

        if (bool) {
            console.log("checked", id);
            this.state.idToDelete.push(id);

        } else {
            console.log("unchecked", id);
            this.state.idToDelete.splice(this.state.idToDelete.indexOf(id), 1);
        }


        if (this.state.idToDelete.length >= 1) {
            this.setState({
                deleteBtnDisabled: false,
            })
        } else {
            this.setState({
                deleteBtnDisabled: true,
            })
        }
        console.log(this.state.idToDelete);
        // console.log(key, this.state.services[key])
    }

    saveButton() {
        if (this.state.nazwa === '' || this.state.cena === '' || this.state.czas === '') {
            console.log("coś ma wartość null")
        } else {
            fetch(url + "/auth/addNewService", {
                method: "POST",
                body: JSON.stringify({
                    name: this.state.nazwa,
                    price: this.state.cena,
                    time: this.state.czas
                })
                ,
                headers: header,
                credentials: "same-origin"
            }).then((Response) => Response.json()).then((findresponse) => {

                this.setState({update: findresponse})


            }).then(() => {
                let update = this.state.update;
                let services = this.state.services;
                services = services.concat(update);
                this.setState({
                    services
                });
                console.log(services)
            });
            this.setState({
                openSnackbar: true,
            })
        }


    }

    confirmModifyButton() {

        let nazwa = this.state.nazwaM;
        let cena = this.state.cenaM;
        let czas = this.state.czasM;

        if (nazwa === '' || cena === '' || czas === '') {
            console.log("coś ma wartość null");

            console.log(nazwa);
            console.log(cena);
            console.log(czas);

            if (nazwa === '') {
                nazwa = this.state.serviceToModify.name;
            }
            if (cena === '') {
                cena = this.state.serviceToModify.price;
            }
            if (czas === '') {
                czas = this.state.serviceToModify.time;
            }
            console.log("sprawdźmy czy dalej");
            console.log(nazwa);
            console.log(cena);
            console.log(czas);

        // } else {

            fetch(url + "/auth/updateService", {
                method: "POST",
                body: JSON.stringify({
                    id: this.state.serviceToModify.id,
                    name: nazwa,
                    price: cena,
                    time: czas
                })
                ,
                headers: header,
                credentials: "same-origin"
            }).then((Response) => Response.json()).then((findresponse) => {

                this.setState({update: findresponse})


            }).then(() => {
                let update = this.state.update;
                let services = this.state.services;
                services = services.concat(update);
                this.setState({
                    services,
                    isLoading: true
                });
                console.log(services);

            }).then(() => {
                this.setState({
                    openSnackbar: true,
                    modifyDialog: false,
                    isLoading: false,
                })
            });

        }
    }

    deleteButton() {
        this.setState({
            deleteConfirmDialog: true,
            openSnackbar: false,
        })
    }

    modifyButton(key) {
        let serviceToModify = this.state.services[key];
        this.setState({
            serviceToModify,
            modifyDialog: true,
            openSnackbar: false,


        });

        console.log(serviceToModify);
        console.log(key);
    }

    openDialog3Button() {
        this.setState({
            addServiceDialog: true,
            //openSnackbar: false,
        })
    }

    confirmDeleteBtn() {
        fetch(url + "/auth/deleteService", {
            method: "POST",
            body: JSON.stringify({
                id: this.state.idToDelete,
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                services: findresponse,
                isLoading: true
            })
        }).then(() => {
            this.setState({
                isLoading: false,
                idToDelete: [],
                deleteBtnDisabled: true,
            })
        })
    }

    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        document.title = "UrodaApp | Usugi";
        fetch(url + "/auth/showServices", {
            method: "POST",
            body: ''
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                services: findresponse
            })
        }).then(() => {
            this.setState({
                isLoading: false
            })
        });
        console.log(this.state.services.name);

        fetch(url + "/auth/showServices", {
            method: "POST",
            body: ''
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {
            this.setState({
                services: findresponse
            })
        })

    };

    handleCloseDialog() {
        this.setState({
            deleteConfirmDialog: false,
            modifyDialog: false,
            addServiceDialog: false,
            //openSnackbar: false,
        })
    }

    handleDataChange(oldValue, newValue, row, column){
        fetch(url + "/auth/updateService", {
            method: "POST",
            body: JSON.stringify({
                id: row.id,
                name: row.name,
                price: row.price,
                time: row.time
            })
            ,
            headers: header,
            credentials: "same-origin"
        }).then((Response) => Response.json()).then((findresponse) => {

            //this.setState({services: findresponse})


        }).then(() => {
            this.setState({
                openSnackbar: true,
                modifyDialog: false,
                isLoading: false,
            })
        });

    }

    handleCloseSnackbar(){
        this.setState({
            openSnackbar: false,
        });
    }

    handleIdToDelete(row, isSelect, rowIndex, e){
        if(isSelect){
            this.state.idToDelete.push(row.id);
        }

        if(!isSelect){
            this.state.idToDelete.splice(this.state.idToDelete.indexOf(row.id), 1);
        }

        // if(!!(this.state.idToDelete)){
        //     this.setState({
        //         deleteBtnDisabled: false
        //     });
        // }else{
        //     this.setState({
        //         deleteBtnDisabled: true
        //     });
        // }

        //+----------------------------------------------------+
        //| po odkomentowaniu tego kawalka zaznaczanie swiruje |
        //+----------------------------------------------------+
        console.log("idToDelete: " + this.state.idToDelete);

    }




    render() {

        const kolumny = [{
            dataField: 'id',
            text: 'id',
            hidden: true
        }, {
            dataField: 'name',
            text: 'Nazwa',
            filter: textFilter()
        }, {
            dataField: 'price',
            text: 'Cena(zł)',
            filter: textFilter(),
            validator: (newValue, row, column) => {
                if(isNaN(newValue)){
                    return{
                        valid: false,
                        message: 'Cena powinna być liczbą'
                    };
                }
                if(newValue > 10000){
                    return{
                        valid: false,
                        message: 'Cena powinna być mniejsza, niż 10 000'
                    };
                }
            }
        }, {
            dataField: 'time',
            text: 'Czas(min)',
            filter: textFilter(),
            validator: (newValue, row, column) => {
                if(isNaN(newValue)){
                    return{
                        valid: false,
                        message: 'Czas powinien być liczbą minut'
                    };
                }
            }
        }];

        const wybierzRzedy = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true,
            onSelect: (row, isSelect, rowIndex, e) => this.handleIdToDelete(row, isSelect, rowIndex, e)
            // {
            //
            //     console.log("row.id: " + row.id);
            //     console.log("isSelect: " + isSelect);
            //     console.log("rowIndex: " + rowIndex);
            //     console.log("e: " + e);
            // }
            ,
            onSelectAll: (isSelect, rows, e) => {
                console.log("isSelect: " + isSelect);
                console.log("rows: " + rows);
                console.log("e: " + e);
            },
        };


        let styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
                fontFamily: "Helvetica",
            },
            helvetica: {
                fontFamily: "Helvetica",
            },
            setMarginLeft: 20,
            setMargin: 12,
            deleteButton: {
                marginBottom: 12,

            },
            deleteBtn: {
                alignItems: "center",
            },
            btnSave: {
                float: "right",
                marginTop: 16,
            },
            btnClear: {
                float: "left",
                marginTop: 16,
            },
            customPaper: {
                paddingLeft: 20,
                paddingRight: 20,
            }
        };

        let content =
                <Row>
                    <Col md={12} sm={12}>
                        <Row style={{overflow: "scroll"}}>
                            <Col md={12} sm={12}>
                                <BootstrapTable
                                    keyField={'id'}
                                    data={this.state.services}
                                    columns={kolumny}
                                    selectRow={wybierzRzedy}
                                    bordered={false}
                                    cellEdit={ cellEditFactory({
                                        mode: 'dbclick',
                                        afterSaveCell: (oldValue, newValue, row, column) => {this.handleDataChange(oldValue, newValue, row, column)},
                                    }) }
                                    filter={filterFactory()}
                                    striped
                                    hover
                                    noDataIndication={'Tabela jest pusta'}>
                                    onCheck={console.log()}

                                </BootstrapTable>

                                {/*<Table>*/}
                                    {/*<thead>*/}
                                    {/*<tr>*/}
                                        {/*<th>#</th>*/}
                                        {/*<th>Nazwa</th>*/}
                                        {/*<th>Cena (zł)</th>*/}
                                        {/*<th>Czas (min)</th>*/}
                                        {/*<th>Modyfikuj</th>*/}
                                    {/*</tr>*/}
                                    {/*</thead>*/}
                                    {/*<tbody>*/}
                                        {/*{this.state.services.map((dynamicData, key) =>*/}
                                            {/*<tr key={key}>*/}
                                                {/*<td><Checkbox*/}
                                                    {/*onCheck={(event, bool) => this.updateCheck(event, bool, dynamicData.id)}*/}
                                                    {/*style={styles.checkbox}*/}
                                                {/*/></td>*/}
                                                {/*<td>{dynamicData.name}</td>*/}
                                                {/*<td>{dynamicData.price}</td>*/}
                                                {/*<td>{dynamicData.time}</td>*/}
                                                {/*<td><RaisedButton label={"click"} onClick={() => this.modifyBtn(key)}/></td>*/}
                                            {/*</tr>*/}
                                        {/*)}*/}
                                    {/*</tbody>*/}
                                {/*</Table>*/}

                            </Col>
                        </Row>
                        <Row style={{position: "sticky", bottom: 15}}>
                            <Col md={12} sm={12}>
                                <RaisedButton label="Usuń zaznaczone" onClick={this.deleteBtn}
                                              disabled={this.state.deleteBtnDisabled}
                                              style={styles.deleteBtn}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            // <RaisedButton label={"Modyfikuj"} onClick={this.modifyBtn}/>
            // </div>
        ;

        let loader =
            <div align="center">
                <CircularProgress size={80} thickness={6}/>
            </div>;

        const actions = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Usuń"
                primary={true}
                keyboardFocused={true}
                onClick={this.confDelBtn}
            />,
        ];

        const actions2 = [
            <FlatButton
                label="Cofnij"
                primary={true}
                onClick={this.handleCloseDial}
            />,
            <FlatButton
                label="Zapisz"
                primary={true}
                keyboardFocused={true}
                onClick={this.confModBtn}
            />,
        ];

        const actions3 = [
            <RaisedButton
                label="Zapisz"
                onClick={this.saveBtn}
                style={styles.btnSave}
                primary={true}/>,
            <RaisedButton
                label="Wyczyść pola"
                style={styles.btnClear}
                onClick={this.clearBtn}
            />,
        ];





        return (
            <Row>
                <MuiThemeProvider>
                    <Col md={12} sm={12}>
                        <Tabs>
                            <Tab label="Zarządzaj usługami">
                                <Row>
                                    <Col md={2} sm={1}/>
                                    <Col md={8} sm={10}>
                                        <h2 style={styles.headline}>Zabiegi</h2>
                                        {
                                            this.state.isLoading ? loader : content
                                        }
                                    </Col>
                                    <Col md={2} sm={1}/>
                                </Row>
                            </Tab>
                            <Tab label="Dodaj usługę">
                                <Row>
                                    <Col md={2} sm={1}/>
                                    <Col md={8} sm={10}>
                                        <h2 style={styles.headline}>Wypełnij wszystkie pola</h2>
                                        <Paper zDepth={2} style={styles.customPaper}>
                                            <TextField hintText="Nazwa" name={"nazwa"} id={"nazwa"}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}
                                                       fullWidth={true}/>
                                            <Divider/>
                                            <TextField hintText="Cena" name={"cena"} id={"cena"}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}
                                                       fullWidth={true}/>
                                            <Divider/>
                                            <TextField hintText="Czas na wykonanie" name={"czas"} id={"czas"}
                                                       onChange={(event) => this.handleUserInput(event)}
                                                       underlineShow={false}
                                                       fullWidth={true}/>
                                            <Divider/>
                                        </Paper>
                                        <RaisedButton
                                            label="Zapisz"
                                            onClick={this.saveBtn}
                                            style={styles.btnSave}
                                            primary={true}/>
                                        <RaisedButton
                                            label="Wyczyść pola"
                                            style={styles.btnClear}
                                            onClick={this.clearBtn}/>
                                    </Col>
                                    <Col md={2} sm={1}/>
                                </Row>
                            </Tab>
                        </Tabs>
                        {/*<FloatingActionButton*/}
                            {/*style={{*/}
                                {/*position: "sticky",*/}
                                {/*bottom: 15,*/}
                                {/*right: 15,*/}
                                {/*float: "right",*/}
                            {/*}}*/}
                            {/*onClick={this.openDial3}*/}
                        {/*/>*/}
                    </Col>

                    <Snackbar
                        open={this.state.openSnackbar}
                        message="Usługa dodana pomyślnie"
                        autoHideDuration={4000}
                        onRequestClose={this.handleClSnackbar}
                    />
                    <Dialog
                        title="Potwierdź decyzję"
                        actions={actions}
                        modal={false}
                        open={this.state.deleteConfirmDialog}
                        onRequestClose={this.handleCloseDial}
                    >
                        Czy na pewno chcesz usunąć zaznaczone pozycje?
                    </Dialog>

                    <Dialog
                        title="Modyfikuj"
                        actions={actions2}
                        modal={false}
                        open={this.state.modifyDialog}
                        onRequestClose={this.handleCloseDial}
                        style={{overflow: "hidden"}}>
                        <TextField
                            name="nazwaM"
                            type="text"
                            id="nazwaM"
                            fullWidth={true}
                            floatingLabelText={"Nazwa"}
                            defaultValue={this.state.serviceToModify.name}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="cenaM"
                            type="text"
                            id="cenaM"
                            fullWidth={true}
                            floatingLabelText={"Cena"}
                            defaultValue={this.state.serviceToModify.price}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                        <TextField
                            name="czasM"
                            type="text"
                            id="czasM"
                            fullWidth={true}
                            floatingLabelText={"Czas na wykonanie (min)"}
                            defaultValue={this.state.serviceToModify.time}
                            onChange={(event) => this.handleUserInput(event)}/><br/>
                    </Dialog>

                    <Dialog
                        title={"Dodaj usługę"}
                        actions={actions3}
                        modal={false}
                        open={this.state.addServiceDialog}
                        onRequestClose={this.handleCloseDial}
                        >
                        <h2 style={styles.headline}>Wypełnij wszystkie pola</h2>
                        <Paper zDepth={2} style={styles.customPaper}>
                            <TextField hintText="Nazwa" name={"nazwa"} id={"nazwa"}
                                       onChange={(event) => this.handleUserInput(event)}
                                       underlineShow={false}
                                       fullWidth={true}/>
                            <Divider/>
                            <TextField hintText="Cena" name={"cena"} id={"cena"}
                                       onChange={(event) => this.handleUserInput(event)}
                                       underlineShow={false}
                                       fullWidth={true}/>
                            <Divider/>
                            <TextField hintText="Czas na wykonanie" name={"czas"} id={"czas"}
                                       onChange={(event) => this.handleUserInput(event)}
                                       underlineShow={false}
                                       fullWidth={true}/>
                            <Divider/>
                        </Paper>
                        <RaisedButton
                            label="Zapisz"
                            onClick={this.saveBtn}
                            style={styles.btnSave}
                            primary={true}/>
                        <RaisedButton
                            label="Wyczyść pola"
                            style={styles.btnClear}
                            onClick={this.clearBtn}/>
                    </Dialog>
                </MuiThemeProvider>
            </Row>

            // <div className="container-fluid main-content">
            //     <div className="row">
            //         <div className="col-md-12">
            //             <div className="col-md-4 margin-auto">
            //                 <form role="form" method="post" id="service-form">
            //                     <span className="label label-default">Nazwa</span>
            //                     <input type="text" className="form-control"/>
            //                     <span className="label label-default">Cena</span>
            //                     <input name="input-price" type="number" className="form-control" id="input-price"/>
            //                     <span className="label label-default">Czas potrzebny na wykonanie</span>
            //                     <input name="input-time" type="number" className="form-control" id="input-time"/>
            //                     <button type="submit" className="btn btn-warning btn-save">Zapisz</button>
            //                     <br/>
            //                     <br/>
            //                     <br/>
            //                 </form>
            //             </div>
            //         </div>
            //
            //     </div>
            //     <div className="row">
            //         <div className="col-md-12">
            //             <div className="col-md-10 margin-auto">
            //                 <div>
            //                     <Table className="table-default">
            //                         <thead>
            //                             <tr>
            //                                 <th/>
            //                                 <th>Nazwa</th>
            //                                 <th>Cena (zł)</th>
            //                                 <th>Czas (min)</th>
            //                             </tr>
            //                         </thead>
            //                         <tbody>
            //                         {this.state.services.map((dynamicData, key) =>
            //                             <tr key={key}>
            //                                 <td>{dynamicData.name}</td>
            //                                 <td>{dynamicData.price}</td>
            //                                 <td>{dynamicData.time}</td>
            //                             </tr>
            //                         )}
            //                         </tbody>
            //                     </Table>
            //                     <button type="button" id="btn-delete" className="btn btn-danger btn-save disabled">Usuń zaznaczone</button>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Service;