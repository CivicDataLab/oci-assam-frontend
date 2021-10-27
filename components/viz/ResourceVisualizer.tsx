import React from 'react';

interface IResourceViz {
  resourceData: any[];
}

type VizType = 'Table' | 'Bar' | 'Map' | 'Line' | 'Bubble';

const ResourceVisualizer: React.FC<IResourceViz> = ({ resourceData }) => {
  const [vizType, setVizType] = React.useState<VizType>('Table');

  const columns = Object.keys(resourceData[0]);

  let vizComponent;

  if (vizType === 'Table') {
    vizComponent = <Table columns={columns} transformedData={resourceData} />;
  }

  return (
    <div className="border border-gray-600 rounded-md truncate">
      <div className="flex items-center justify-around">
        <div>
          <input type="radio" name="viz" id="viz-table" value="Table" />
          <label htmlFor="viz-table">Table</label>
        </div>
        <div>
          <input type="radio" name="viz" id="viz-line" value="Line" />
          <label htmlFor="viz-line">Time Series</label>
        </div>
        <div>
          <input type="radio" name="viz" id="viz-bar" value="Bar" />
          <label htmlFor="viz-bar">Yearly Trends</label>
        </div>
      </div>
      {vizComponent}
    </div>
  );
};

const Table = ({ columns, transformedData }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns?.map((column) => (
            <td key={column}>{column}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {transformedData?.map((data) => (
          <tr key={Math.random() * Math.random()}>
            {columns?.map((column) => (
              <td key={column}>{data[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResourceVisualizer;
