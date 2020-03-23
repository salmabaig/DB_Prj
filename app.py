import os
#from os.path import join, dirname
# from dotenv import load_dotenv
import sqlite3 as sql
from flask import Flask, request, Response, json, jsonify, render_template
import uuid
import re
from fractions import Fraction
import pymysql
countRow = 0
countProp = 0
countProps = 0
#Environment Variables
# dotenv_path = join(dirname(__file__), '.env')
# load_dotenv(dotenv_path)

app = Flask(__name__, template_folder='static')
app.config["DEBUG"] = True


if __name__ == "__main__":
    app.run(port=5000)

#Route for /
@app.route("/")
def hello():
    return render_template('/index.html')

#Make SQL cursor return dictionary 
def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

#Post request method for /login GETS USER INPUT
@app.route('/login', methods=['POST'])
def login():
    try:
        username =  request.form['login-username'];
        password = request.form['password'];
        conLogin = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
        curC = conLogin.cursor()
        curC.execute("SELECT password, cust_id FROM cust WHERE USERNAME = '" + username + "';")
        temp = curC.fetchone()
        curC.close()
        print(temp)
        if temp != None:
            print("Successly Found match")
            passwordDB = temp[0]
            cust_id = temp[1]
            if password == passwordDB:
                print("Successly password Matches")
                return jsonify({
                    'auth': True,
                    'user': {
                        "username": username,
                        "password": password,
                        "cust_id": cust_id
                    }
                })
            else:
                return jsonify({
                    'auth': False
                })
        else:
            return jsonify({
                'auth' : "User does not exist"
            })
    except Exception as e:
        print(e)
        #return jsonify({
         #   'auth': False
        #})

#Post request method for /login GETS USER INPUT
@app.route('/loginAgent', methods=['POST'])
def loginAgent():
    print("Inside Login()")
    username = request.form['login-username-agent'];
    password = request.form['password-agent'];
    print("Values read in: ")
    print(username)
    print(password)
    conLogin = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    cur = conLogin.cursor()
    cur.execute("SELECT password, agent_id FROM agent WHERE USERNAME = '" + username + "';")
    temp = cur.fetchone()
    cur.close()
    print(temp)
    if temp != None:
        print("Successly Found match")
        passwordDB = temp[0]
        agent_id = temp[1]
        if password == passwordDB:
            print("Successly password Matches")
            return jsonify({
                'auth': True,
                'userAgent': {
                    "username": username,
                    "password": password,
                    "agent_id": agent_id
                }
            })
        else:
            return jsonify({
                'auth': False
            })
    else:
        return jsonify({
            'auth':"User does not exist"
        })

#Post request method for /register GETS USER INPUT
@app.route('/register', methods=['POST'])
def register():
    email =  request.form['emailreg'];
    password = request.form['passwordreg'];
    passwordconf = request.form['passwordconfreg'];
    username = request.form['username'];
    telephone = request.form['telephone'];
    address = request.form['address'];
    name = request.form['name'];
    conn = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    a = conn.cursor()
    countRow = a.execute("Select * from cust")
    custID = str(countRow + 1)

    # Uncomment the following line to create the table then comment it again after the first registration
    # cur.execute("CREATE TABLE users(id INT PRIMARY_KEY, firstName TEXT, lastName TEXT, email TEXT UNIQUE, password TEXT)")
    try:
        a.execute("SELECT * FROM cust WHERE USERNAME = '" + username + "';")
        temp = a.fetchone()
        print(temp)
        if temp != None:
            return jsonify({
                'registered': False
            })
    except:
        print("User not found")
    if password == passwordconf:
        #a.execute("""INSERT INTO customers(id, firstName, lastName, email, password) VALUES (?,?,?,?,?);""", (uid, firstName, lastName, email, password))
        a.execute("INSERT INTO cust(`CUST_ID`, `TELEPHONE`, USERNAME, `PASSWORD`, `EMAIL`, `NAME`, `ADDRESS`) VALUES (" + custID + ", '" + telephone + "','" + username + "', '" + password + "', '" + email + "', '" + name + "', '" + address + "');")
        conn.commit()
        conn.close()
        a.close()
        return jsonify({
            'registered': True
        })
    else:
        return jsonify({
            'registered': "Wrong Password"
        })

@app.route('/delProp', methods=['POST'])
def delProp():
    listNo =  request.form['listNo'];
    agent_id = request.form['agent_id'];
    conn = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    a = conn.cursor()
    try:
        row1 = a.execute("DELETE from works_on_sale where LISTNUM=" + listNo + " AND AGENT_NO=" + agent_id + ";")
        row2 = a.execute("DELETE from works_on_rent where LISTNO=" + listNo + " AND AGENT_NUM=" + agent_id + ";")

        if(row1 > 0 or row2 > 0):
            a.execute("DELETE from likes_rental where LIST_N =" + listNo + ";")
            a.execute("DELETE from likes_sale where LIST_NU =" + listNo + ";")
            a.execute("DELETE from rental where LISTING_NUM=" + listNo + ";")
            a.execute("DELETE from homes_for_sale where LISTING_NO=" + listNo + ";")
            a.execute("DELETE from property where LISTING_NO=" + listNo + ";")
        else:
            return jsonify({
                'deleted' : False
            })
        conn.commit()
        a.close()
        conn.close()
        return jsonify({
        'deleted': True })
    except Exception as e:
        print(e)

        return jsonify({
            'deleted': False
        })

@app.route('/addFave', methods=['POST'])
def addToFave():
    listNo =  request.form['listNo'];
    cust_id = request.form['cust_id'];
    conn = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    a = conn.cursor()
    print(listNo)
    print(cust_id)
    if(a.execute("Select * from rental where listing_num= " + listNo + ";")==1):
        a.execute("INSERT INTO likes_rental (`LIST_N`, `CUST_NO`) VALUES ('" + listNo + "', '" + cust_id + "');")
        conn.commit()
        a.close()
        conn.close()
        return jsonify({
            'addedFave': True
        })

    if (a.execute("Select * from homes_for_sale where listing_no= " + listNo + ";") == 1):
        a.execute("INSERT INTO likes_sale (`LIST_NU`, `CUST_NUMB`) VALUES ('" + listNo + "', '" +cust_id + "');")
        conn.commit()
        a.close()
        conn.close()
        return jsonify({
            'addedFave': True
        })

    conn.commit()
    a.close()
    conn.close()
    return jsonify({
        'addedFave': False
    })

@app.route('/addRental', methods=['POST'])
def addrental():
    print("Inside add rental")
    homeAddress = request.form['addAddress'];
    city = request.form['addCity'];
    state = request.form['addState'];
    zipcode = request.form['addZipcode'];
    bedroom = request.form['addBedroom'];
    bathroom = request.form['addBathroom'];
    year = request.form['addYear'];
    type = request.form['addType'];
    occNum = request.form['addOccNum'];
    price = request.form['addPrice'];
    vDate = request.form['addVacDate'];
    pet = request.form['addPet'];
    leaseType = request.form['addLeaseType'];
    descrip = request.form['addDescrip'];
    area = request.form['addArea'];
    agentUsername = request.form['username']
    agentID = request.form['id']
    #agentPass = request.form['password']

    try:
        connProp = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
        p = connProp.cursor()
        p.execute("Select MAX(listing_no) from property;")
        countProp = list(p.fetchone())
        print("Lisitng number: ", countProp[0])
        listID = str(int(countProp[0]) + 1)
        print("ListID: ", listID)
        p.execute("INSERT INTO property (`LISTING_NO`, `ADDRESS`, `BEDROOM`, `BATHROOM`, `YEAR_BUILT`, `HOUSE_TYPE`, `CITY`, `AREA`, `ZIPCODE`, `DESCRIPTION`, `STATE`) VALUES ('" + listID + "', '" + homeAddress + "', '" + bedroom + "', '" + bathroom + "', '" + year + "', '" + type + "', '" + city + "', '" + area + "', '" + zipcode + "', '" + descrip + "', '" + state + "');")
        p.execute("INSERT INTO rental (`LISTING_NUM`, `OCCUP_NUM`, `PRICE`, `VACANCY_DATE`, `PET_ALLOW`, `LEASE_TYPE`) VALUES ('" + listID + "', '" + occNum + "', '" + price + "', '" + vDate + "', '" + pet + "', '" + leaseType + "');")
        p.execute("INSERT INTO `realestate`.`works_on_rent` (`LISTNO`, `AGENT_NUM`) VALUES ('" +listID + "', '" + agentID + "');")
        connProp.commit()
        connProp.close()
        p.close()
        return jsonify({
            'addedrental' : True
        })
    except Exception as e:
        print(e)
        print("Error!")
        return jsonify({
            'addedrental' : False
        })

@app.route('/addSale', methods=['POST'])
def addsale():
    print("Inside add sale")
    shomeAddress = request.form['addsAddress'];
    scity = request.form['addsCity'];
    sstate = request.form['addsState'];
    szipcode = request.form['addsZipcode'];
    sbedroom = request.form['addsBedroom'];
    sbathroom = request.form['addsBathroom'];
    syear = request.form['addsYear'];
    stype = request.form['addsType'];
    yearTax = request.form['addsYearTax'];
    sprice = request.form['addsPrice'];
    addlastSold = request.form['addlastSold'];
    sdescrip = request.form['addsDescrip'];
    sarea = request.form['addsArea'];
    sagentUsername = request.form['susername']
    sagentID = request.form['sid']
    #agentPass = request.form['spassword']

    try:
        connProps = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
        s = connProps.cursor()
        s.execute("Select MAX(listing_no) from property;")
        countProps = list(s.fetchone())
        print("Lisitng number: ", countProps[0])
        listIDs = str(int(countProps[0]) + 1)
        print("ListID: ", listIDs)
        s.execute("INSERT INTO property (`LISTING_NO`, `ADDRESS`, `BEDROOM`, `BATHROOM`, `YEAR_BUILT`, `HOUSE_TYPE`, `CITY`, `AREA`, `ZIPCODE`, `DESCRIPTION`, `STATE`) VALUES ('" + listIDs + "', '" + shomeAddress + "', '" + sbedroom + "', '" + sbathroom + "', '" + syear + "', '" + stype + "', '" + scity + "', '" + sarea + "', '" + szipcode + "', '" + sdescrip + "', '" + sstate + "');")
        s.execute("INSERT INTO homes_for_sale (`LISTING_NO`, `PRICE`, `YEARLY_TAX`, `LAST_SOLD`) VALUES ('" + listIDs + "', '" + sprice + "', '" + yearTax + "', '" + addlastSold + "');")
        s.execute("INSERT INTO works_on_sale (`AGENT_NO`, `LISTNUM`) VALUES ('" + sagentID + "', '" + listIDs + "');")
        connProps.commit()
        connProps.close()
        s.close()
        return jsonify({
            'addedsale' : True
        })
    except Exception as e:
        print(e)
        print("Error!")
        return jsonify({
            'addedsale' : False
        })
@app.route('/listRental', methods=['GET'])
def listRent():
    username = request.args.get("username");
    agentID = request.args.get("agent_id");
    print(username)
    print(agentID)
    connRent = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connRent.cursor()
    row = c.execute("Select P.address as address, P.city as city, P.zipcode as zipcode,P.state as state, P.bedroom as bedroom, P.bathroom as bathroom,P.listing_no as listNo, R.price as price, P.area as area, P.house_type as type, P.year_built as year,R.vacancy_date as vDate from works_on_rent as W, Property as P, rental as R WHERE W.LISTNO=P.LISTING_NO AND P.LISTING_NO=R.LISTING_NUM AND W.AGENT_NUM=" + agentID + ";")
    valid = True
    if row == 0:
        valid = False
    eventdata = c.fetchall()
    print(eventdata)
    connRent.commit()
    connRent.close()
    c.close()
    return jsonify({
        'events': eventdata,
        'valid' : valid
    });

@app.route('/listSale', methods=['GET'])
def listSale():
    username = request.args.get("username");
    agentID = request.args.get("agent_id");
    print(username)
    print(agentID)
    connSale = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connSale.cursor()
    row = c.execute("Select P.address as address, P.city as city, P.zipcode as zipcode,P.state as state, P.bedroom as bedroom, P.bathroom as bathroom,P.listing_no as listNo, S.price as price, P.area as area, P.house_type as type, P.year_built as year,S.last_sold as sDate, S.yearly_tax as tax, P.description as descrip from Property as P, homes_for_sale as S, works_on_sale as O WHERE P.LISTING_NO=S.LISTING_NO AND O.listnum = P.listing_no AND O.agent_no = " + agentID + ";")
    valid = True
    if row == 0:
        valid = False
    eventdata = c.fetchall()
    print(eventdata)
    connSale.commit()
    connSale.close()
    c.close()
    return jsonify({
        'eventsSale': eventdata,
        'valid' : valid
    });

@app.route('/listCust', methods=['GET'])
def listCust():
    username = request.args.get("username");
    agentID = request.args.get("agent_id");
    print(username)
    print(agentID)
    connSale = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connSale.cursor()
    row = c.execute("Select P.listing_no, P.address, P.city, P.state,P.zipcode, C.name, C.email, C.telephone From likes_rental L, works_on_rent W, Cust C,property P Where P.listing_no=W.listno AND P.listing_no = L.LIST_N AND C.cust_id = L.cust_no AND W.agent_num =" + agentID + ";")
    eventdata = c.fetchall()
    row2 = c.execute("Select P.listing_no, P.address, P.city, P.state,P.zipcode, C.name, C.email, C.telephone From likes_sale L, works_on_sale W, Cust C,property P Where P.listing_no=W.listnum AND P.listing_no = L.LIST_NU AND C.cust_id = L.cust_numb AND W.agent_no =" + agentID + ";")
    eventdata2 = c.fetchall()
    eventdataFinal = eventdata + eventdata2
    valid = True
    if row == 0 and row2 == 0:
        valid = False
    print(eventdata)
    connSale.commit()
    connSale.close()
    c.close()
    return jsonify({
        'eventsSale': eventdataFinal,
        'valid' : valid
    });

@app.route('/listRentFave', methods=['GET'])
def listrentfave():
    username = request.args.get("username");
    custID = request.args.get("cust_id");
    print(username)
    print(custID)
    connRent = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connRent.cursor()
    row = c.execute("Select P.address as address, P.city as city, P.zipcode as zipcode,P.state as state, P.bedroom as bedroom, P.bathroom as bathroom,P.listing_no as listNo, R.price as price, P.area as area, P.house_type as type, P.year_built as year,R.vacancy_date as vDate, a.email as email, a.telephone as tele from likes_rental as W, Property as P, rental as R, agent as A, works_on_rent as O WHERE W.LIST_N=P.LISTING_NO AND P.LISTING_NO=R.LISTING_NUM AND O.listno = P.listing_no AND a.agent_id = O.agent_num  AND W.cust_no=" + custID + ";")
    valid = True
    if row == 0:
        valid = False
    eventdata = c.fetchall()
    print(eventdata)
    connRent.commit()
    connRent.close()
    c.close()
    return jsonify({
        'events': eventdata,
        'valid' : valid
    });

@app.route('/listSaleFave', methods=['GET'])
def listsalefave():
    username = request.args.get("username");
    custID = request.args.get("cust_id");
    print(username)
    print(custID)
    connRent = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connRent.cursor()
    row = c.execute("Select P.address as address, P.city as city, P.zipcode as zipcode,P.state as state, P.bedroom as bedroom, P.bathroom as bathroom,P.listing_no as listNo, S.price as price, P.area as area, P.house_type as type, P.year_built as year,S.last_sold as sDate, S.yearly_tax as tax, a.email as email, a.telephone as tele from likes_sale as W, Property as P, homes_for_sale as S, agent as A, works_on_sale as O WHERE W.LIST_NU=P.LISTING_NO AND P.LISTING_NO=S.LISTING_NO AND O.listnum = P.listing_no AND a.agent_id = O.agent_no AND W.cust_numb=" + custID + ";")
    valid = True
    if row == 0:
        valid = False
    eventdata = c.fetchall()
    print(eventdata)
    connRent.commit()
    connRent.close()
    c.close()
    return jsonify({
        'events': eventdata,
        'valid' : valid
    });

@app.route('/search', methods=['GET'])
def search():
    print("Inside search Function")
    query = request.args.get("query")
    print(query)
    connRent = pymysql.connect(host='localhost', user='root', password='saybismillah1', db='realestate')
    c = connRent.cursor()
    row = c.execute(query)
    searchData = c.fetchall()
    connRent.commit()
    connRent.close()
    c.close()
    print(searchData)
    valid = True
    return jsonify({
        'data' : searchData,
        'valid': valid
    });

#************IGNORE BELOW CODE, USE AS REFERENCE***********************************

#Returns user's events RETURNS TO SCREEN
@app.route('/getEvents', methods=['GET'])
def home():
    #Print json from get request
    print(request.args)
    #Save the email to a variable
    email =  request.args.get("temp");
    print(email)
    con = sql.connect("temp.db")
    con.row_factory = dict_factory
    cur = con.cursor()
    # Uncomment the following line to create the table then comment it again after the first registration
    # cur.execute("CREATE TABLE event(id INT PRIMARY_KEY, email TEXT, eventName TEXT, eventTime TEXT, eventUrl TEXT)")
    uid = str(uuid.uuid4())
    # Uncomment to make a test Event
    # cur.execute("""INSERT INTO event(id, email, eventName, eventTime, eventUrl) VALUES(?,?,?,?,?)""",(uid, email, 'Event Name 3', 'Date 3', 'bullsync3.com'))
    cur.execute("SELECT * FROM event WHERE email=?", (email,))
    eventdata = cur.fetchall()
    print(eventdata)
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'events': eventdata

    });

# GETS USER INPUT
@app.route('/newEvent', methods=['POST'])
def newEvent():
    email = request.form['email']
    eventName =  request.form['eventName'];
    eventTime = request.form['eventTime'];
    eventUrl = request.form['eventUrl'];
    con = sql.connect("temp.db", timeout=10)
    con.row_factory = dict_factory
    cur = con.cursor()
    # Uncomment the following line to create the table then comment it again after the first registration
    # cur.execute("CREATE TABLE event(id INT PRIMARY_KEY, email TEXT, eventName TEXT, eventTime TEXT, eventUrl TEXT)")
    uid = str(uuid.uuid4())
    cur.execute("""INSERT INTO event(id, email, eventName, eventTime, eventUrl) VALUES (?,?,?,?,?);""", (uid, email, eventName, eventTime, eventUrl))
    con.commit()
    cur.close()
    con.close()
    return jsonify({
        'newEventStatus': True
    })