import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

const StockPopup = ({ open, handleClose, products }) => {
    const capitalizeFirstLetter = (str) => {
        if (!str) return ""; // Handle case when the input is undefined or null
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle>Low Stock Products</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Selling Price</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Subcategory</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell colSpan={1}>
                                        <p
                                            style={{
                                                backgroundColor: " #FF578929",
                                                textAlign: "center",
                                                borderRadius: "8px",
                                                padding: "1px 2px",
                                            }}
                                        >
                                            {product.stock} left
                                        </p>
                                    </TableCell>

                                    <TableCell>₹{product.price}</TableCell>
                                    <TableCell>
                                        {capitalizeFirstLetter(product.category)}
                                    </TableCell>
                                    <TableCell>
                                        {capitalizeFirstLetter(product.subCategory)}
                                    </TableCell>
                                    <TableCell>{capitalizeFirstLetter(product.brand)}</TableCell>

                                    <TableCell>
                                        {product.isVerified === "true" ? (
                                            <p
                                                style={{
                                                    backgroundColor: "#32936F29",
                                                    textAlign: "center",
                                                    borderRadius: "8px",
                                                    padding: "4px 11px",
                                                }}
                                            >
                                                Active
                                            </p>
                                        ) : (
                                            <p
                                                style={{
                                                    backgroundColor: " #FF578929",
                                                    textAlign: "center",
                                                    borderRadius: "8px",
                                                    padding: "4px 11px",
                                                }}
                                            >
                                                Inactive
                                            </p>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default StockPopup;