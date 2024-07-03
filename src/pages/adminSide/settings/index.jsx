import React, { useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";

export default function ResourceSettings() {
  const [requiredDollar, setRequiredDollar] = useState(false);
  const [requiredExpense, setrequiredExpense] = useState(false);
  const [getExpenseApi, setgetExpenseApi] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://pmsapi.xeventechnologies.com/getExpenses")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed");
        }
      })
      .then((data) => {
        setData(data); // Set the response data into the state
      })
      .catch((error) => {
      });
  }, [getExpenseApi]);
  const [dollarRate, setDollarRate] = useState(data?.dollarRate);
  const [resourceExpense, setResourceExpense] = useState(
    data?.resourceExpenses
  );
  function updateExpense(expenseId, updatedFields) {
    if (resourceExpense || dollarRate) {
      fetch(`https://pmsapi.xeventechnologies.com/editExpense/${expenseId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      })
        .then((response) => {
          if (response.ok) {
            setgetExpenseApi(!getExpenseApi);
            return response.json();
          } else {
            throw new Error("Update expense request failed");
          }
        })
        .then((updatedExpense) => {
          setData(
            data.map((expense) =>
              expense.id === expenseId ? updatedExpense : expense
            )
          );
        })
        .catch((error) => {
        });
    } else {
      // setRequiredDollar(true);
      // setrequiredExpense(true);
    }
  }
  return (
    <div>
      <Card className="border-0">
        <Card.Body>
          <Row className="mb-3">
            <Col lg={12}>
              <div className="d-flex flex-wrap justify-content-between align-items-center ">
                <h5 className="mb-2">Settings</h5>
              </div>
            </Col>
          </Row>
          <Row className="mx-4">
            <Col>
              <p>
                Dollar conversion rate ={" "}
                <span className="text-muted">{data?.dollarRate}</span>
              </p>
              <input
                type="number"
                className="form-control w-25"
                defaultValue={data?.dollarRate}
                // value={dollarRate}
                onChange={(e) => {
                  setDollarRate(e.target.value);
                  setRequiredDollar(false);
                }}
              />
              {requiredDollar === true ? (
                <span className="text-danger">Enter Dollar rate</span>
              ) : null}
              <p className="mt-3">
                Avg monthly expense ={" "}
                <span className="text-muted">{data?.resourceExpenses}</span>
              </p>
              <input
                type="number"
                className="form-control w-25"
                defaultValue={data?.resourceExpenses}
                // value={data?.resourceExpenses}
                onChange={(e) => {
                  setResourceExpense(e.target.value);
                  setrequiredExpense(false);
                }}
              />
              {requiredExpense === true ? (
                <span className="text-danger">Enter Resource Expense</span>
              ) : null}
            </Col>
          </Row>
          <Row className="justify-content-end">
            <Col lg={1} className="text-end">
              <Button
                className="btn-primary border-0 px-3"
                onClick={() =>
                  updateExpense(data._id, {
                    dollarRate: dollarRate ? dollarRate : data?.dollarRate,
                    resourceExpenses: resourceExpense
                      ? resourceExpense
                      : data?.resourceExpenses,
                  })
                }
              >
                Save
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
