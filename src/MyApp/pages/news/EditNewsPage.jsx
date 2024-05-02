import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { NewsInstance } from "services/NewsServices";

import NewsEditForm from "./forms/NewsEditForm";

export default function EditNewsPage() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState({});

  useEffect(() => {
    const fetchNew = async () => {
      const response = await NewsInstance.getUnique(parseInt(id));
      setNoticia(response.results[0]);
      console.log(response.results[0]);
    };
    fetchNew();
  }, []);

  return (
    <>
      <Card className="p-4">
        <NewsEditForm noticia={noticia} />
      </Card>
    </>
  );
}
