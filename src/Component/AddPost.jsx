import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { getAllCategoryData } from "../Services/category-service";
import { toast } from "react-toastify";
import { getCurrentUserDetail } from "../Auth";
import { createPost, uploadPostImage } from "../Services/post-service";

const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  // const config = {
  //   placeholder: "start typing",
  // };
  const [user, setUser] = useState({});
  const [formdata, setFormData] = useState({
    title: "",
    categoryId: 0,
    content: "",
  });

  const [image , setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
    console.log(formdata);
  };
  const contentFieldChangeData = (e) => {
    setFormData({ ...formdata, content: e });
    console.log(formdata);
  };

  const dataSaved = (e) => {
    e.preventDefault();
    if (formdata.categoryId.trim() === null) {
      toast.error("category cant be empty");
      return;
    }
    if (formdata.title.trim() === "") {
      toast.error("title cant be empty");
      return;
    }
    if (formdata.content.trim() === "") {
      toast.error("content cant be empty");
      return;
    }
    formdata["userId"] = user.id;
    // formdata["categoryId"] = parseInt(formdata["categoryId"]);
    console.log(formdata);
    createPost(formdata)
      .then((res) => {
        // console.log(res.message);

        uploadPostImage(image,res.postId).then((data)=>{
          toast.success("Image uploaded!");
          setImage(null)
        }).catch((err)=>{
          toast.error("error in uploading image !")
        })
        toast.success("post created successfully!");
        setFormData({
          title: "",
          categoryId:0,
          content: "",
        });
      })
      .catch((err) => {
        toast.error("post not created due to some error");
      });
  };

  useEffect(() => {
    // get user from the localStorage
    setUser(getCurrentUserDetail());
    getAllCategoryData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//  handlign filechange event

  const handleFileChange=(event)=>{
      console.log(event.target.files[0])
      setImage(event.target.files[0]);
  }
  return (
    <div className="wapper">
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          <Card className="shadow mt-2">
            <CardBody>
              <h3>whats going on in your mind ?</h3>

              <Form onSubmit={dataSaved}>
                <FormGroup className="my-3 text-start">
                  <Label for="title">this is title of the post .</Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formdata.title}
                    placeholder="Enter here post title"
                    onChange={(e) => handleChange(e)}
                  />
                </FormGroup>
                <FormGroup className="my-3 text-start">
                  <Label for="categoryId">select your post category .</Label>
                  <Input
                    type="select"
                    id="categoryId"
                    name="categoryId"
                    onChange={handleChange}
                    value={formdata.categoryId}
                    defaultValue={0}
                  >
                    <option value={0} disabled>
                      --select category--
                    </option>
                    {data.map((val) => (
                      <option value={val.categoryId} key={val.categoryId}>
                        {val.categoryTitle}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

           {/* image section */}
                <FormGroup className="my-3 text-start">
                  <Label for="image">Upload Images</Label>
                  <Input id="image" type="file" multiple onChange={handleFileChange}/>
                </FormGroup>

               {/* text area  */}

                <FormGroup className="my-3 text-start">
                  <Label for="content">write post content here.</Label>
                  <JoditEditor
                    ref={editor}
                    value={formdata.content}
                    onChange={(newContent) =>
                      contentFieldChangeData(newContent)
                    }
                  />
                </FormGroup>
                <Container>
                  <Button color="primary" type="submit">
                    Create post
                  </Button>
                  <Button className="ms-2" type="reset" color="danger">
                    Reset
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddPost;
