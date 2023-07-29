import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import Box from '@mui/material/Box';

// styles for chips
function getStyles(name, personName) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? 500
                : 400,
    };
}

//generic component for Chips select
export const ChipSelect = ({ label, value, handleChange, menuItemData, handleDeleteChip }) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleDelte = (event, selected, currentValue) => {
        event.preventDefault();
        handleDeleteChip(selected, currentValue);
    }

    return (
        <FormControl sx={{ m: 1, width: "100%", margin: 0 }}>
            <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={value && value}
                onChange={(event) => handleChange(event)}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip
                                key={value}
                                label={value}
                                color="primary"
                                clickable
                                deleteIcon={
                                    <CancelIcon
                                        onMouseDown={(event) => event.stopPropagation()}
                                    />
                                }
                                onDelete={(event) => handleDelte(event, selected, value)} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {menuItemData && menuItemData.map((item, index) => (
                    <MenuItem
                        key={index}
                        value={item}
                        style={getStyles(item, menuItemData)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}