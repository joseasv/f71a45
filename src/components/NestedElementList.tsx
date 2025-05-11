import { List, ListItem } from "@mui/material"

const NestedElementList = (({data, onClick, selectedElementIndex}) => {
    console.log("nested element list data", data)
    const propertiesArray = Object.entries(data.field_schema.properties)
    console.log("propertiesArray ", propertiesArray)
    return  (
        <List>
    {propertiesArray.map((property, index) => (
        <ListItem style={{cursor:"pointer"}} onClick={()=>{
            onClick(selectedElementIndex, property[0])
        }} key={index}>{property[0]}</ListItem>

    ))}
    </List>

    )
})

export default NestedElementList
