import React from 'react';

const TagCodeTable = ({
    handleFieldSetup,
}) => {
    const handClick = (e, mode, name, index) => {
        console.log(e.target.value)
        handleFieldSetup(mode, name, index, e.target.value);
    };

    return (
        <div className="section-table-tag-code">
            <table className="table table-bordered table-tag-code">
                <thead>
                    <tr>
                        <th>Tag code</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{RequestCode}]"
                                onClick={(e) => handClick(e, "Textbox", "[{RequestCode}]", "null")}
                            >
                                00006-eDOC-LMART-2024
                            </span>
                        </td>
                        <td>Mã request</td>
                    </tr>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{SignerName1}]"
                                onClick={(e) => handClick(e, "Textbox", "[{SignerName1}]", "1")}
                            >
                                Nguyen Thanh Nghia
                            </span>
                        </td>
                        <td>Tên người ký 1</td>
                    </tr>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{SignerName2}]"
                                onClick={(e) => handClick(e, "Textbox", "[{SignerName2}]", "2")}
                            >
                                Nguyen Nghia Thanh
                            </span>
                        </td>
                        <td>Tên người ký 2</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default TagCodeTable;
