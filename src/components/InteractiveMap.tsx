import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
// import '../App.css'; // Style this with Tailwind or a dedicated CSS module if needed
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';

// Define the mapping from SVG path IDs to county names
const svgIdToCountyNameMap: { [key: string]: string } = {
  'Co_Antrim': 'antrim',
  'Co_Armagh': 'armagh',
  'Co_Carlow': 'carlow',
  'Co_Cavan': 'cavan',
  'Co_Clare': 'clare',
  'Co_Cork': 'cork',
  'Co_Derry': 'derry',
  'Co_Donegal': 'donegal',
  'Co_Down': 'down',
  'Co_Dublin': 'dublin',
  'Co_Fermanagh': 'fermanagh',
  'Co_Galway': 'galway',
  'Co_Kerry': 'kerry',
  'Co_Kildare': 'kildare',
  'Co_Kilkenny': 'kilkenny',
  'Co_Laois': 'laois',
  'Co_Leitrim': 'leitrim',
  'Co_Limerick': 'limerick',
  'Co_Longford': 'longford',
  'Co_Louth': 'louth',
  'Co_Mayo': 'mayo',
  'Co_Meath': 'meath',
  'Co_Monaghan': 'monaghan',
  'Co_Offaly': 'offaly',
  'Co_Roscommon': 'roscommon',
  'Co_Sligo': 'sligo',
  'Co_Tipperary': 'tipperary',
  'Co_Tyrone': 'tyrone',
  'Co_Waterford': 'waterford',
  'Co_Westmeath': 'westmeath',
  'Co_Wexford': 'wexford',
  'Co_Wicklow': 'wicklow'
};

// Create a mapping to the image paths in the public directory
const countyImages: { [key: string]: string } = Object.fromEntries(
  Object.values(svgIdToCountyNameMap).map(countyName => [
    countyName,
    `/product_images/${countyName}.png`
  ])
);

const InteractiveMap: React.FC = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [hoveredCountyName, setHoveredCountyName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For general errors
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // For hover-related messages (image or error)
  const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({ display: 'none' });
  
  const svgRef = useRef<HTMLObjectElement>(null);
  const lastHoveredPath = useRef<SVGPathElement | null>(null);
  const originalFill = useRef<string>('rgba(0,0,0,0.001)'); // Authoritative transparent fill
  const listenersAttached = useRef(false);
  const countyHoverListeners = useRef<{ id: string; enter: () => void; leave: () => void; }[]>([]);

  const handleCountyMouseEnter = (svgId: string) => {
    console.log(`Attempting hover for svgId: ${svgId}`);
    const svgObject = svgRef.current;
    if (!svgObject?.contentDocument) {
      console.error("SVG document not available in handleCountyMouseEnter early check");
      setErrorMessage("SVG document not available.");
      return;
    }
    const svgDoc = svgObject.contentDocument;
    console.log("SVG document in handleCountyMouseEnter:", svgDoc ? 'Exists' : 'NULL');

    const pathElement = svgDoc.getElementById(svgId) as SVGPathElement | null;
    console.log(`Path element for ${svgId}:`, pathElement ? 'Found' : 'Not Found');

    if (pathElement) {
      console.log(`MOUSE ENTER: svgId = ${svgId}. Current fill: ${pathElement.style.fill}`);
      if (lastHoveredPath.current && lastHoveredPath.current !== pathElement) {
        console.log(`Restoring previous path ${lastHoveredPath.current.id} to ${originalFill.current}`);
        lastHoveredPath.current.style.fill = originalFill.current;
        lastHoveredPath.current.style.fillOpacity = '0.001';
      }
      
      // Highlight the current path
      pathElement.style.fill = 'lightblue';
      pathElement.style.fillOpacity = '0.5'; // Make hover state more visible
      lastHoveredPath.current = pathElement;
      console.log(`Path ${svgId} highlighted. originalFill.current remains: ${originalFill.current}`);

      const countyName = svgIdToCountyNameMap[svgId];
      setHoveredCountyName(countyName);

      const pathRect = pathElement.getBoundingClientRect();
      
      // Calculate consistent position for both image preview and error popup
      const popupTop = pathRect.top + window.scrollY + (pathRect.height / 2); // Center vertically on path
      console.log("popupTop:", popupTop);
      const popupLeft = pathRect.left + window.scrollX + (pathRect.width / 2); // Center horizontally on path
      console.log("popupLeft:", popupLeft);

      const newPreviewStyle: React.CSSProperties = {
        display: 'block',
        position: 'absolute',
        top: `${popupTop}px`,
        left: `${popupLeft}px`,
        transform: 'translate(-50%, -50%)', // Center the popup on the calculated top/left
        zIndex: 1000,
        pointerEvents: 'none'
      };
      setPreviewStyle(newPreviewStyle);

      if (countyName) {
        if (countyImages[countyName]) {
          setErrorMessage(null); // Clear general error if any
          setPopupMessage(null); // Clear any previous popup message
          console.log(`Image found for ${countyName}.`);
        } else {
          const errorMsg = `Image not available for ${countyName.charAt(0).toUpperCase() + countyName.slice(1)}.`;
          // setErrorMessage(errorMsg); // No longer set general error for this
          setPopupMessage(errorMsg); // Set message for popup
          console.log(errorMsg);
        }
      } else {
        const errorMsg = `Unknown county ID: ${svgId}`;
        setErrorMessage(errorMsg); // General error for unknown ID
        setPopupMessage(null); // No popup for this type of error
        console.warn(errorMsg);
        setHoveredCountyName(null);
        setPreviewStyle({ display: 'none' }); 
      }
    } else {
      const errorMsg = `Path element not found for ID: ${svgId}`;
      setErrorMessage(errorMsg); // General error for path not found
      setPopupMessage(null); // No popup
      console.error(errorMsg);
      setPreviewStyle({ display: 'none' });
    }
  };

  const handleCountyMouseLeave = () => {
    console.log("Attempting mouse leave");
    if (lastHoveredPath.current) {
      console.log(`MOUSE LEAVE: Restoring path ${lastHoveredPath.current.id} to ${originalFill.current}`);
      lastHoveredPath.current.style.fill = originalFill.current;
      lastHoveredPath.current.style.fillOpacity = '0.001';
      lastHoveredPath.current = null;
    }
    setPreviewStyle({ display: 'none' });
    setHoveredCountyName(null);
    setPopupMessage(null); // Clear popup message on mouse leave
    console.log("Preview hidden, hoveredCountyName cleared, popupMessage cleared.");
  };

  useEffect(() => {
    const svgObject = svgRef.current;
    console.log("SVG object:", svgObject);
    
    const setupEventListeners = (currentSvgDoc: Document) => {
      if (!currentSvgDoc) {
        console.log("SVG not loaded yet, skipping setupEventListeners.");
        return;
      }
      if (listenersAttached.current) {
        console.log("Event listeners already attached, skipping setupEventListeners.");
        return;
      }
      console.log("Setting up event listeners for SVG paths...");

      countyHoverListeners.current = [];

      // Find all paths that match our county patterns
      const paths = currentSvgDoc.querySelectorAll('path[id^="Co_"], path[id^="U_"]');
      console.log(`Found ${paths.length} county paths in SVG`, paths);

      paths.forEach((path) => {
        const pathElement = path as SVGPathElement;
        const svgId = pathElement.id;

        // Ensure the path is interactive and has the correct initial style
        pathElement.style.fill = originalFill.current;
        pathElement.style.fillOpacity = '0.001'; // Make it slightly visible for interaction
        pathElement.style.pointerEvents = 'all';
        pathElement.style.cursor = 'pointer';
        pathElement.style.transition = 'fill 0.2s ease';

        const countyName = svgIdToCountyNameMap[svgId];
        console.log(`Processing path: id=${svgId}, countyName=${countyName}`);

        const enterListener = () => handleCountyMouseEnter(svgId);
        const leaveListener = () => handleCountyMouseLeave();
        
        pathElement.addEventListener('mouseenter', enterListener);
        pathElement.addEventListener('mouseleave', leaveListener);
        countyHoverListeners.current.push({ id: svgId, enter: enterListener, leave: leaveListener });
      });

      if (paths.length === 0) {
        // If no paths found, log all path IDs for debugging
        const allPaths = currentSvgDoc.getElementsByTagName('path');
        console.log("All path IDs in SVG:", Array.from(allPaths).map(p => p.id));
        setErrorMessage("Map counties could not be loaded. Please try refreshing the page.");
      } else {
        setErrorMessage(null);
        listenersAttached.current = true;
        console.log("Event listeners attached successfully.");
      }
    };
    
    const loadSvgContent = async () => {
      try {
        // Fetch the SVG content directly
        const response = await fetch('/map_svg/Island_of_Ireland_location_map.svg');
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.status} ${response.statusText}`);
        }
        
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        
        // Check if we got a valid SVG
        const svgElement = svgDoc.documentElement;
        if (svgElement.tagName.toLowerCase() !== 'svg') {
          throw new Error('Failed to parse SVG content');
        }

        // Ensure SVG scales to fit its container by removing fixed dimensions
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
        // The viewBox attribute along with container CSS (w-full, h-full) 
        // will handle responsive scaling.

        // Insert the SVG content into the object element
        if (svgObject?.contentDocument) {
          const contentDoc = svgObject.contentDocument;
          // Clear any existing content
          while (contentDoc.firstChild) {
            contentDoc.removeChild(contentDoc.firstChild);
          }
          // Import and append the SVG node
          const importedNode = contentDoc.importNode(svgDoc.documentElement, true);
          contentDoc.appendChild(importedNode);
          
          // add x ms delay to the loadSvgContent function
          await new Promise(resolve => setTimeout(resolve, 2000));
          // Setup event listeners now that we have valid SVG content
          setupEventListeners(contentDoc);
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        setErrorMessage('Failed to load the map. Please try refreshing the page.');
      }
    };

    if (svgObject) {
      loadSvgContent();
    }

    return () => {
      // Cleanup code remains the same
      if (countyHoverListeners.current.length > 0) {
        console.log("Cleanup: Removing event listeners.");
        const svgDoc = svgObject?.contentDocument;
        if (svgDoc) {
          countyHoverListeners.current.forEach(({ id, enter, leave }) => {
            const path = svgDoc.getElementById(id);
            if (path) {
              path.removeEventListener('mouseenter', enter);
              path.removeEventListener('mouseleave', leave);
            }
          });
        }
      }
      listenersAttached.current = false;
      console.log("listenersAttached flag reset to false.");
    };
  }, [svgRef.current]);

  return (
    <Box className="flex flex-col h-full w-full max-h-[400px] max-w-[300px] p-4">
      <Typography variant="h5" component="h1" className="text-center mb-4">
        {t('mapTitle')} {/* Use t function for translation */}
      </Typography>
      {errorMessage && (
        <Alert severity="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}
      <Box className="relative flex-1 w-full" style={{ aspectRatio: '1449.8/1807.07' }}> {/* Match SVG's aspect ratio */}
        <object 
          ref={svgRef} 
          type="image/svg+xml" 
          aria-label="Interactive map of Ireland"
          className="absolute inset-0 w-full h-full max-h-[400px] max-w-[300px]" // Fill container while maintaining aspect ratio
          style={{ 
            display: 'block'
          }}
        >
          Map of Ireland loading...
        </object>
        {hoveredCountyName && countyImages[hoveredCountyName] && !popupMessage && (
          <Paper
            elevation={0}
            style={{ ...previewStyle, backgroundColor: 'transparent' }}
            className="p-1 rounded-lg shadow-md"
          >
            <img
              src={countyImages[hoveredCountyName]}
              alt={`${hoveredCountyName.charAt(0).toUpperCase() + hoveredCountyName.slice(1)} County`}
              style={{ maxWidth: '150px', maxHeight: '150px', display: 'block' }} // Constrain image size
            />
          </Paper>
        )}
        {popupMessage && ( // Display popup for errors or other messages
          <Paper
            elevation={5}
            style={previewStyle} // Use the same style for positioning
            className="p-1 rounded-lg shadow-md bg-transparent" // Style for error messages
          >
            <Typography variant="caption">{popupMessage}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default InteractiveMap;
