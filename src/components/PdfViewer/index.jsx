import React, { useEffect, useState } from 'react';
import '../../index.css';
import {
  PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
  ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject,
  TextMarkupAnnotation // Import TextMarkupAnnotation
} from '@syncfusion/ej2-react-pdfviewer';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import fileUploadApi from '../../api/fileUploadApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TagCodeTable from '../TagCodeTable';
import Loading from '../Loading';
import { Button } from 'antd';;

const PDFViewer = () => {

  const navigate = useNavigate()

  const [fileUpload, setFileUpload] = useState(null);
  const [fileUrl, setFileUrl] = useState(null)
  const [queryParams] = useSearchParams();
  const { id } = useParams();
  const documentId = queryParams.get('id');
  const type = queryParams.get('type');
  const isDelete = queryParams.get('isDelete') == false;
  const [isLoading, setIsLoading] = useState(true);
  const fileName = 'pdf-review.pdf';
  const urlBE = "https://localhost:44389"

  // useEffect(() => {
  //   const fetchFileUpload = async () => {
  //     try {
  //       if (id) {
  //         const res = await fileUploadApi.getFileUpload(id, documentId, fileName, type, isDelete);
  //         if (res.state === "true") {
  //           setFileUrl(res.FileBase64);
  //           setFileUpload(res.file)
  //           setIsLoading(false)
  //         }
  //       }
  //     } catch (error) {
  //       console.log('Error fetching file:', error);
  //     }
  //   };

  //   fetchFileUpload();
  // }, [id]);

  useEffect(() => {
    setIsLoading(false)
  }, [navigate]);

  function getNewIndex(name) {
    const viewer = document.getElementById('container').ej2_instances[0];
    try {
      const fields_match_name = viewer.formFieldCollections.filter(f => f.name.includes(name));
      if (fields_match_name.length === 0) return 0;
      return Math.max(...fields_match_name.map(f => parseInt(f.name.split('.')[1].replace('}]', '')))) + 1;
    } catch (e) {
      return viewer.formFields.filter(e => e.properties.name.indexOf(name) >= 0).length;
    }
  }

  const handleFormSetup = (mode, name, index, value) => {
    const viewer = document.getElementById('container').ej2_instances[0];
    viewer.designerMode = true;
    if (viewer.designerMode) {
      const formDesignerModule = viewer.formDesignerModule;

      viewer.isFormDesignerToolbarVisible = true

      const initNameField = name.replace('[{', '').replace('}]', '')
      const nameField = '[{' + initNameField + '.' + getNewIndex(initNameField) + '}]'

      formDesignerModule.pdfViewer.drawingObject = {
        formFieldAnnotationType: mode,
        name: nameField,
        fontFamily: "Times New Roman",
        fontSize: 11,
        fontStyle: 'None',
        color: 'black',
        backgroundColor: '#daeaf7ff',
        thickness: 1,
        borderColor: '#303030',
        alignment: 'center',
        isReadonly: false,
        visibility: "visible",
        isRequired: false,
        isPrint: true,
        rotateAngle: 0,
        tooltip: '',
        font: {
          isItalic: false,
          isBold: false,
          isStrikeout: false,
          isUnderline: false
        }
      };
      formDesignerModule.pdfViewer.tool = "DrawTool";
      formDesignerModule.isSetFormFieldMode = true;
    }
  };


  const handleAdd = (e) => {
    const formField = e.field;
    if (formField) {
      const formFieldNameElement = document.getElementById(`${formField.id}_designer_name`)
      const name = formField.name.replace('[{', '').replace('}]', '');
      var label;
      if (name.includes("RequestCode")) {
        label = "RequestCode";
      } else if (name.includes("SignerJobTitle")) {
        label = "SignerJobTitle";
      } else if (name.includes("Title")) {
        label = "Title";
      } else if (name.includes("SignerName")) {
        label = "Nguyen Thanh Nghia";
      }
      formFieldNameElement.innerHTML = label
    }
  };

  const handleAjaxRequestInitiate = (args) => {
    const viewer = document.getElementById('container').ej2_instances[0];

    if (viewer.serverActionSettings.load == "Load") {
      args.JsonData['documenApprovaltId'] = documentId;
      args.JsonData['fileId'] = id;
      viewer.setJsonData(args.JsonData);
    }
  };

  const handleSave = () => {
    const viewer = document.getElementById('container').ej2_instances[0];
    viewer.saveAsBlob("pdf").then(function (blob) {
      var fileReader = new FileReader();

      fileReader.onload = async function () {
        var base64Text = ";base64,";
        var documentData = {
          fileId: id,
          fileName: fileName,
          documentApprovalId: documentId,
          documentData: fileReader.result.substring(fileReader.result.indexOf(base64Text) + base64Text.length)
        }
        const res = await fileUploadApi.saveFileUpload(documentData);
        if (res.state === "true") {
          navigate("/avn/documentapproval")
        }
      }
      fileReader.readAsDataURL(blob);
    })
  };

  const handleLoading = (e) => {
    if (e.documentName) {
      const viewer = document.getElementById('container').ej2_instances[0];
      const initFields = viewer.formFieldCollections
      if (initFields.length) {
        initFields.map(f => {
          document.getElementById(`${f.id}_designer_name`).style.display = "none"
        })
      }
      setIsLoading(false)
    }
  };

  const handleAjaxSuccess = (e) => {
    // if()
  };

  return (
    <>
      {isLoading ? <Loading /> :
        <div>
          <div className='control-section' style={{ display: "flex", marginTop: "20px" }}>
            <PdfViewerComponent
              id="container"
              documentPath={fileName}
              formFieldAdd={handleAdd}
              name={fileName}
              documentLoad={handleLoading}
              ajaxRequestInitiate={handleAjaxRequestInitiate}
              ajaxRequestSuccess={handleAjaxSuccess}
              enableDownload={true}
              serviceUrl={urlBE + '/api/pdf-viewers'}
              style={{ flex: 3, height: "100vh" }}>
              {/* Inject the required services */}
              <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView, ThumbnailView,
                Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
            </PdfViewerComponent>
            <div style={{ flex: 1 }}>
              <TagCodeTable handleFieldSetup={handleFormSetup} />
            </div>
            <Button
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      }
    </>
  );
};

export default PDFViewer;