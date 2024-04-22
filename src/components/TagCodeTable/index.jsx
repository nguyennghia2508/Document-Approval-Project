import React from 'react';

const TagCodeTable = ({
    handleFieldSetup,
    document,
    listSigner,
}) => {
    const handClick = (e, mode, name) => {
        handleFieldSetup(mode, name);
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
                                {document?.RequestCode}
                            </span>
                        </td>
                        <td>Mã request</td>
                    </tr>
                    <tr>
                        <td>
                            <span
                                className="draggable"
                                draggable
                                value="[{Title}]"
                                onClick={(e) => handClick(e, "Textbox", "[{Title}]", "null")}
                            >
                                {document?.Subject}
                            </span>
                        </td>
                        <td>Tiêu đề</td>
                    </tr>
                    {listSigner && listSigner.length > 0 && listSigner.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>
                                    <span
                                        className="draggable"
                                        draggable
                                        value="[{SignerName1}]"
                                        onClick={(e) => handClick(e, "Textbox", `[{SignedDate${item.Index}}]`)}
                                    >
                                        {`[{SignedDate${item.Index}}]`}
                                    </span>
                                </td>
                                <td>Thời gian ký {item.Index}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span
                                        className="draggable"
                                        draggable
                                        value="[{SignerName1}]"
                                        onClick={(e) => handClick(e, "Textbox", `[{SignerName${item.Index}}]`)}
                                    >
                                        {item.ApprovalPersonName}
                                    </span>
                                </td>
                                <td>Tên người ký {item.Index}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default TagCodeTable;
